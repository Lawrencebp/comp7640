import request from "@/util/axiosConfig.js";

export const customerLoginReq = (username, password) => {
    return request.post('/admin/user/login', {
        username,
        password
    })
}

export const vendorLoginReq = (vendorName, password) => {
    return request.post('/admin/vendor/login', {
        vendorName,
        password
    })
}

export const vendorRegisterReq = (username, password, businessName, hkarea, hkdistrict, address) => {
    // Concatenating address, district, and area
    const geographicalPresence = `${address}, ${hkdistrict}, ${hkarea}`;

    // Sending the request to the backend API
    return request.post('/vendor/registerVendor', {
        username,
        password,
        businessName,
        geographicalPresence
    });
}
export const customerRegisterReq = (userName, password, nickName, contactNumber, hkarea, hkdistrict, address) => {
    // Concatenating address, district, and area
    const shippingDetails = `${address}, ${hkdistrict}, ${hkarea}`;

    // Sending the request to the backend API
    return request.post('/user/registerUser', {
        userName,
        password,
        nickName,
        contactNumber,
        shippingDetails
    });
}
