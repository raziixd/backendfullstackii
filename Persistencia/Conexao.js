import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "aluno19-pfsii",
    port: 3306,
    password: "aluno19-pfsii",
    database: "backendaluno19-pfsii",
  });

  //LOCAL
  // const conexao = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "backend"
  // });

  global.conexao = conexao;

  return conexao;
}
