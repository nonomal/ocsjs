// @ts-check

const ocs = require("@ocsjs/scripts");
const { loggerPrefix } = require("@ocsjs/scripts");
const { Instance: Chalk } = require("chalk");
const { Logger } = require("./src/logger.core");
const { redBright, bgRedBright, bgBlueBright, bgYellowBright, bgGray } = new Chalk({ level: 2 });

/** @type { Logger} */
let logger;

/** @type {import("playwright").BrowserContext | import("playwright").Browser} */
let browser;
/** @type {import("playwright").Page} */
let page;

process.on("message", async (message) => {
    // @ts-ignore
    const { action, data, uid, logsPath } = JSON.parse(message);
    if (logger === undefined) {
        logger = new Logger(logsPath, false, "script", uid);
        logger.info("日志 : " + logger.dest);
    }

    try {
        if (action === "open") {
            if (browser === undefined) {
                logger.info("任务启动 : ", action, data, uid, logsPath);

                /** @type {import("@ocsjs/scripts").LaunchScriptsOptions} */
                const options = JSON.parse(data);
                const { userDataDir, launchOptions, scripts } = options;
                console.log("\n");
                debug("任务启动", uid);
                debug("隐身模式 ", launchOptions.headless === true ? bgBlueBright("开启") : bgRedBright("关闭"));
                debug("无痕浏览 ", userDataDir === "" ? bgBlueBright("开启") : bgRedBright("关闭"));

                function debug(...msg) {
                    console.log(bgGray(loggerPrefix("debug")), ...msg);
                }

                launchOptions.logger = {
                    isEnabled: () => true,
                    log(name, severity, message, args) {
                        const str = [severity, new Date().toLocaleTimeString(), name, message, args].join(" ");
                        console.log(str);
                        logger.info(str);
                    },
                };

                const { browser: _browser, page: _page } = await ocs.launchScripts({
                    userDataDir,
                    launchOptions,
                    scripts,
                });
                browser = _browser;
                page = _page;
            } else {
                console.log(bgYellowBright(loggerPrefix("warn")), "任务已开启，请勿重复开启。", uid);
                logger.info("任务已开启，请勿重复开启。");
            }
        } else if (action === "close") {
            console.log(bgBlueBright(loggerPrefix("info")), "任务已关闭!");
            logger.info("任务已关闭!");
            await browser.close();
            browser = undefined;
            page = undefined;
        } else if (action === "call") {
            const { name, args } = JSON.parse(data);
            await page[name](args);
        }
    } catch (e) {
        console.log(bgRedBright(loggerPrefix("error")), "任务发生未知错误 : ", e);
        logger.info("任务发生未知错误!", e);
    }
});