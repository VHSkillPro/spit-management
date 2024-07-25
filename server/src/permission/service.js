const express = require("express");
const db = require("../../models");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");

/**
 * API lấy danh sách quyền
 * @path /api/v1/permissions
 * @method GET
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = async (req, res) => {
    try {
        const permissions = await db.Permission.findAll();

        return res.status(HTTP_STATUS_CODE.OK).json({
            status: "success",
            data: {
                permissions,
            },
            message: "Xem danh sách quyền",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "error",
            error: "Lỗi hệ thống",
        });
    }
};

module.exports = {
    index,
};
