/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    try {
        const permissions = {
            "user.index": "Xem danh sách người dùng",
            "user.show": "Xem thông tin người dùng",
            "user.create": "Thêm người dùng",
            "user.update": "Cập nhật thông tin người dùng",
            "user.destroy": "Xóa người dùng",

            "role.index": "Xem danh sách chức vụ",
            "role.show": "Xem thông tin chức vụ",
            "role.create": "Thêm chức vụ",
            "role.update": "Cập nhật thông tin chức vụ",
            "role.destroy": "Xóa chức vụ",

            "permission.index": "Xem danh sách quyền",
            "permission.show": "Xem thông tin quyền",
        };

        await knex.transaction(async (trx) => {
            for (const [id, name] of Object.entries(permissions)) {
                const existed = await knex("Permissions")
                    .where("id", id)
                    .first();

                if (!existed) {
                    await knex("Permissions").insert({
                        id,
                        name,
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
};
