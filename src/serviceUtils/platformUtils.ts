const userAgent = navigator.userAgent;

export const enum PlatformType {
    Mobile = "mobile",
    PC = "pc",
}

export const checkPlatform = (): PlatformType => {
    if (
        userAgent.indexOf("iPhone") > -1 ||
        userAgent.indexOf("Android") > -1 ||
        userAgent.indexOf("iPad") > -1 ||
        userAgent.indexOf("iPod") > -1
    ) {
        return PlatformType.Mobile;
    }
    return PlatformType.PC;
};
