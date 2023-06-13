const requestBody = (videoId) => {
  return {
    context: {
      client: {
        hl: "vi",
        gl: "VN",
        remoteHost: "116.102.224.213",
        deviceMake: "",
        deviceModel: "",
        visitorData: "CgtXSC1yaVBORXNjRSj_-qGjBg%3D%3D",
        userAgent:
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36,gzip(gfe)",
        clientName: "WEB",
        clientVersion: "2.20230517.09.00",
        osName: "X11",
        osVersion: "",
        originalUrl: "https://www.youtube.com/shorts/ESjHEVfPZ04",
        platform: "DESKTOP",
        clientFormFactor: "UNKNOWN_FORM_FACTOR",
        configInfo: {
          appInstallData:
            "CP_6oaMGEMa6_hIQieiuBRDM364FEKqy_hIQzK7-EhDbm68FEO6irwUQ8qivBRDj8q4FEKO0rwUQw7f-EhDMt_4SEKLsrgUQ1LavBRCkwv4SEL22rgUQuIuuBRDUoa8FEKWZrwUQ_KavBRCgt_4SEOSz_hIQgp2vBRDi1K4FEOf3rgUQm66vBQ%3D%3D",
        },
        timeZone: "Asia/Saigon",
        browserName: "Chrome",
        browserVersion: "113.0.0.0",
        acceptHeader:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        deviceExperimentId:
          "ChxOekl6TlRFM01EYzROemd6TmpNMk1qQTBNZz09EP_6oaMGGP_6oaMG",
        screenWidthPoints: 698,
        screenHeightPoints: 943,
        screenPixelDensity: 1,
        screenDensityFloat: 1,
        utcOffsetMinutes: 420,
        userInterfaceTheme: "USER_INTERFACE_THEME_LIGHT",
        connectionType: "CONN_CELLULAR_4G",
        memoryTotalKbytes: "8000000",
        mainAppWebInfo: {
          graftUrl: "https://www.youtube.com/shorts/WYAicbst-G0",
          pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED",
          webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
          isWebNativeShareAvailable: false,
        },
      },
      user: {
        lockedSafetyMode: false,
      },
      request: {
        useSsl: true,
        internalExperimentFlags: [],
        consistencyTokenJars: [],
      },
      clickTracking: {
        clickTrackingParams: "CBMQ7fkGGAEiEwiA0dSntoP_AhVB3XMBHRuMDCk=",
      },
      adSignalsInfo: {
        params: [
          { key: "dt", value: "1684569471810" },
          { key: "flash", value: "0" },
          { key: "frm", value: "0" },
          { key: "u_tz", value: "420" },
          { key: "u_his", value: "16" },
          { key: "u_h", value: "1080" },
          { key: "u_w", value: "1920" },
          { key: "u_ah", value: "1053" },
          { key: "u_aw", value: "1846" },
          { key: "u_cd", value: "24" },
          { key: "bc", value: "31" },
          { key: "bih", value: "943" },
          { key: "biw", value: "698" },
          { key: "brdim", value: "74,64,74,64,1846,27,1846,1016,698,943" },
          { key: "vis", value: "1" },
          { key: "wgl", value: "true" },
          { key: "ca_type", value: "image" },
        ],
        bid: "ANyPxKrNF_INpnnerxoqtRz03Pum4dt7DRC5Y0Xp3tV-AiOpVa68YuOhLzXjSEQuHFQU9hUU0E9RJmvZJo9P7qmmlZE5RhN1aA",
      },
    },
    playerRequest: {
      videoId: videoId,
    },
    params: "CAwaEwjBxdWntoP_AhWV3HMBHT-UDNsqAA%3D%3D",
    disablePlayerResponse: true,
  };
};
module.exports = requestBody;
