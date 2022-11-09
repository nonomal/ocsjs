import { definedCustomElements } from '../elements';
import { MessageElement } from '../elements/message';
import { ModelElement } from '../elements/model';

import { Config } from '../interfaces/config';
import { cors } from '../interfaces/cors';
import { Project } from '../interfaces/project';
import { Script } from '../interfaces/script';
import { getMatchedScripts, namespaceKey } from '../utils/common';
import { el, enableElementDraggable, tooltip } from '../utils/dom';
import { StartConfig } from '../utils/start';
import { humpToTarget } from '../utils/string';
import { getInfos, getValue } from '../utils/tampermonkey';

export type ModelAttrs = Pick<
	ModelElement,
	'content' | 'onConfirm' | 'onCancel' | 'cancelButtonText' | 'confirmButtonText' | 'placeholder' | 'width'
> & {
	disableWrapperCloseable?: boolean;
	title?: ModelElement['title'];
};

const panel = el('div');
const root = panel.attachShadow({ mode: 'closed' });
const messageContainer = el('div', { className: 'message-container' });

const InitPanelScript = new Script({
	name: '初始化页面',
	url: [/.*/],
	namespace: 'init.panel',
	hideInPanel: true,
	configs: {
		x: { defaultValue: window.innerWidth * 0.1 },
		y: { defaultValue: window.innerWidth * 0.1 },
		visual: { defaultValue: 'normal' },
		expandAll: { defaultValue: false },
		currentPanelName: { defaultValue: 'init.panel' },
		models: { defaultValue: '' }
	},
	onactive({ style, projects }: StartConfig) {
		/** 注册自定义元素 */
		for (const element of definedCustomElements) {
			const name = humpToTarget(element.name, '-');
			customElements.define(name, element);
		}

		/** 当前匹配到的脚本，并且面板不隐藏 */
		const matchedScripts = getMatchedScripts(projects, [location.href]).filter((s) => !s.hideInPanel);

		const container = el('container-element');

		/** 创建头部元素 */
		const initHeader = () => {
			/** 图标 */
			container.header.logo = tooltip(
				el('img', {
					src: getInfos().script.icon || '',
					width: 18,
					className: 'logo',
					title: '官方教程',
					onclick: () => {
						window.open(getInfos().script.homepage || '', '_blank');
					}
				})
			);
			/** 版本简介 */
			container.header.profile = el('div', { className: 'profile' }, 'OCS-' + (getInfos().script.version || '0'));

			/** 面板切换器 */
			const projectSelector = tooltip(
				el(
					'select',
					{
						className: ['project-selector', this.cfg.expandAll ? 'expand-all' : ''].join(' '),
						title: '点击选择脚本操作页面，部分脚本会提供操作页面（包含脚本设置和脚本提示）。',
						onchange: () => {
							this.cfg.currentPanelName = projectSelector.value;
							// 替换元素
							replaceBody();
						}
					},
					(select) => {
						for (const project of projects.sort(({ level: a = 0 }, { level: b = 0 }) => b - a)) {
							const scripts = getMatchedScripts([project], getValue('_urls_') || [])
								.filter((s) => !s.hideInPanel)
								.sort(({ level: a = 0 }, { level: b = 0 }) => b - a);
							for (const script of scripts) {
								select.append(
									el('option', {
										value: project.name + '-' + script.name,
										innerText: project.name + '-' + script.name,
										selected: project.name + '-' + script.name === this.cfg.currentPanelName
									})
								);
							}
						}
					}
				)
			);
			container.header.projectSelector = projectSelector;

			/** 是否展开所有脚本 */
			const isExpandAll = () => this.cfg.expandAll === true;
			/** 脚本切换按钮 */
			const expandSwitcher = tooltip(
				el('div', {
					className: 'panel-switch',
					title: isExpandAll() ? '收缩脚本' : '展开脚本',
					innerText: isExpandAll() ? '-' : '≡',
					onclick: () => {
						this.cfg.expandAll = !isExpandAll();
						expandSwitcher.title = this.cfg.expandAll ? '收缩脚本' : '展开脚本';
						expandSwitcher.innerText = this.cfg.expandAll ? '-' : '≡';
						projectSelector.classList.toggle('expand-all');
						// 替换元素
						replaceBody();
					}
				})
			);
			container.header.expandSwitcher = expandSwitcher;

			/** 窗口是否最小化 */
			const isMinimize = () => this.cfg.visual === 'minimize';
			/** 窗口状态切换按钮 */
			const visualSwitcher = tooltip(
				el('div', {
					className: 'switch ',
					title: isMinimize() ? '点击展开窗口' : '点击最小化窗口',
					innerText: isMinimize() ? '□' : '-',
					onclick: () => {
						this.cfg.visual = isMinimize() ? 'normal' : 'minimize';
						visualSwitcher.title = isMinimize() ? '点击展开窗口' : '点击最小化窗口';
						visualSwitcher.innerText = isMinimize() ? '□' : '-';
					}
				})
			);
			container.header.visualSwitcher = visualSwitcher;

			/** 窗口关闭按钮 */
			container.header.closeButton = tooltip(
				el('div', {
					className: 'close  ',
					innerText: 'x',
					title: '点击关闭窗口（不会影响脚本运行，连续点击三次页面任意位置可以重新唤出窗口）',
					onclick: () => (this.cfg.visual = 'close')
				})
			);
		};

		const createScriptPanel = (projectName: string, script: Script) => {
			// 创建脚本面板
			const scriptPanel = el('script-panel-element', {
				name: this.cfg.expandAll ? projectName + '-' + script.name : script.name
			});

			// 监听提示内容改变
			script.onConfigChange('notes', (pre, curr) => {
				scriptPanel.notesContainer.innerHTML = script.cfg.notes || '';
			});
			// 注入 panel 对象 ， 脚本可修改 panel 对象进行面板的内容自定义
			script.panel = scriptPanel;

			scriptPanel.notesContainer.innerHTML = script.cfg.notes || '';
			scriptPanel.configsBody.append(...createConfigs(script.namespace, script.configs || {}));
			scriptPanel.configsContainer.append(scriptPanel.configsBody);

			return scriptPanel;
		};

		/** 创建内容 */
		const createBody = () => {
			const scriptContainers = [];
			const allScript = [];

			for (const project of projects) {
				const scripts = getMatchedScripts([project], getValue('_urls_') || [location.href]).filter(
					(s) => !s.hideInPanel
				);
				allScript.push(...scripts);

				const initPanelAndScript = (script: Script) => {
					const panel = createScriptPanel(project.name, script);
					script.projectName = project.name;
					script.panel = panel;
					script.header = container.header;
					return panel;
				};
				for (const script of scripts) {
					scriptContainers.push(initPanelAndScript(script));
				}
			}

			if (!this.cfg.expandAll) {
				const index = allScript.findIndex((s) => s.projectName + '-' + s.name === this.cfg.currentPanelName);
				if (index !== -1) {
					return [scriptContainers[index]];
				}
			}
			// 如果全部展开
			return scriptContainers;
		};

		/** 处理面板位置 */
		const handlePosition = () => {
			container.style.top = this.cfg.y + 'px';
			container.style.left = this.cfg.x + 'px';
			const positionHandler = () => {
				this.cfg.x = container.offsetLeft;
				this.cfg.y = container.offsetTop;
			};
			enableElementDraggable(container.header, container, positionHandler);
		};

		/** 处理面板可视状态 */
		const handleVisible = () => {
			/** 切换面板状态 */
			const visual = (value: string) => {
				container.className = '';

				// 最小化
				if (value === 'minimize') {
					container.classList.add('minimize');
				}
				// 关闭
				else if (value === 'close') {
					container.classList.add('close');
				}
				// 展开
				else {
					container.classList.add('normal');
				}
			};
			window.addEventListener('click', (e) => {
				// 三击重置位置
				if (e.detail === 3) {
					container.style.top = e.y + 'px';
					container.style.left = e.x + 'px';
					this.cfg.x = e.x;
					this.cfg.y = e.y;
					this.cfg.visual = this.cfg.visual === 'close' ? 'normal' : this.cfg.visual;
				}
			});
			// 跨域监听状态切换
			this.onConfigChange('visual', (pre, curr) => visual(curr));
			visual(this.cfg.visual);
		};

		/** 监听页面状态改变 */
		const handleHistoryChange = () => {
			history.pushState = addFunctionEventListener(history, 'pushState');
			history.replaceState = addFunctionEventListener(history, 'replaceState');
			window.addEventListener('pushState', render);
			window.addEventListener('replaceState', render);
		};

		/** 替换 body 中的内容 */
		const replaceBody = () => {
			container.body.replaceChildren(...createBody());
		};
		/** 创建设置区域 */

		const createConfigs = (namespace: string | undefined, configs: Record<string, Config<any>>) => {
			const elements = [];
			for (const key in configs) {
				if (Object.prototype.hasOwnProperty.call(configs, key)) {
					const cfg = configs[key];
					if (cfg.label !== undefined) {
						const element = el('config-element', {
							key: namespaceKey(namespace, key),
							tag: cfg.tag,
							sync: cfg.sync,
							attrs: cfg.attrs,
							_onload: cfg.onload
						});
						element.label.textContent = cfg.label;
						elements.push(element);
					}
				}
			}

			return elements;
		};

		/** 初始化模态框系统 */
		const initModelSystem = () => {
			// 添加 models 监听队列
			cors.on('model', async ([type, _attrs]) => {
				return new Promise((resolve, reject) => {
					const attrs = _attrs as ModelAttrs;
					attrs.onCancel = () => resolve('');
					attrs.onConfirm = resolve;

					$model(type, attrs);
				});
			});
		};

		const render = () => {
			initHeader();
			replaceBody();
		};

		/** 在顶级页面显示操作面板 */
		if (matchedScripts.length !== 0 && self === top) {
			// 创建样式元素
			container.append(el('style', {}, style || ''), messageContainer);
			render();
			// 随机位置插入操作面板到页面
			root.append(container);
			document.body.children[random(0, document.body.children.length - 1)].after(panel);
			initModelSystem();
			handleHistoryChange();
			handlePosition();
		}

		handleVisible();
	}
});

export const InitProject: Project = {
	name: '初始化程序',
	domains: [],
	scripts: [InitPanelScript]
};

/**
 * 创建一个模态框代替原生的 alert, confirm, prompt
 */
export function $model(type: ModelElement['type'], attrs: ModelAttrs) {
	if (self === top) {
		const { disableWrapperCloseable, onConfirm, onCancel, ..._attrs } = attrs;

		root.append(
			el('div', { className: 'model-wrapper' }, (wrapper) => {
				const model = el('model-element', {
					onConfirm(val) {
						onConfirm?.apply(model, [val]);
						wrapper.remove();
					},
					onCancel() {
						onCancel?.apply(model);
						wrapper.remove();
					},
					type,
					..._attrs
				});
				wrapper.append(model);

				model.addEventListener('click', (e) => {
					e.stopPropagation();
				});
				if (!disableWrapperCloseable) {
					/** 点击遮罩层关闭模态框 */
					wrapper.addEventListener('click', () => wrapper.remove());
				}
			})
		);
	} else {
		cors.emit('model', [type, attrs], (args, remote) => {
			if (args) {
				attrs.onConfirm?.(args);
			} else {
				attrs.onCancel?.();
			}
		});
	}
}

/**
 * 消息推送
 */
export function $message(
	type: MessageElement['type'],
	attrs: Pick<MessageElement, 'duration' | 'onClose' | 'content' | 'closeable'>
) {
	messageContainer.append(el('message-element', { type, ...attrs }));
}

/**
 * 添加事件调用监听器
 */
function addFunctionEventListener(obj: any, type: string) {
	const origin = obj[type];
	return function (...args: any[]) {
		// @ts-ignore
		const res = origin.apply(this, args);
		const e = new Event(type.toString());
		// @ts-ignore
		e.arguments = args;
		window.dispatchEvent(e);
		return res;
	};
}

function random(min: number, max: number) {
	return Math.round(Math.random() * (max - min)) + min;
}
