export const convertUnixToNewDate = (unixDate: any) => {
    const now = new Date(unixDate * 1000);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istTime = new Date(now.getTime() + istOffset);
  
    return istTime;
}

export const getConvertDate = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istTime = new Date(now.getTime() + istOffset);
  
    return istTime;
}

  