import connection  from "../database/database.js";

async function getRanking(req,res){
    let body = [];

    try {
        const query = await connection.query(`
            SELECT 
                users.id,
                name,
                COALESCE(SUM("visitCount"),0) AS "visitCount",
                COUNT(url) AS "linksCount"
            FROM users 
            LEFT JOIN links 
            ON links."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `);
        body = query.rows;
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    return res.send(body);
}

export default getRanking;