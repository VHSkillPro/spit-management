const express = require("express");
const db = require("../../models");
const HTTP_STATUS_CODE = require("../../utils/httpStatusCode");

/**
 * API trả về danh sách role
 *
 * URI: /api/v1/roles
 *
 * Method: GET
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = async (req, res) => {
    try {
        const roles = await db.Role.findAll();

        return res.status(HTTP_STATUS_CODE.OK).send({
            status: "success",
            data: {
                roles: roles,
            },
            message: "Lấy tất cả roles thành công",
        });
    } catch (error) {
        console.log(error);

        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Lỗi máy chủ",
        });
    }
};

module.exports = {
    index,
};
