const {title,baseURL,urlPrefix,uploadUrl} = require("@/config");

export const useGlobSetting = (): Readonly<any> => {  
    // Take global configuration
    const glob: Readonly<any> = {
      title: title,
      apiUrl: baseURL,
      shortName: process.env.VUE_GLOB_APP_SHORT_NAME,
      urlPrefix: urlPrefix,
      uploadUrl: uploadUrl,
    };
    return glob as Readonly<any>;
  };