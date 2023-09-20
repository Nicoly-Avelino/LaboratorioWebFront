import { useEffect, useState } from "react";
import ConverteBase64ToImage from "./ConverteBase64ToImage";
import "./style.css";

const ConsultaCatalogo = () => {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const consulta = async () => {
      try {
        const resposta = await fetch("http://localhost:8081/api/v1/produtos");
        if (!resposta.ok) {
          throw new Error();
        }

        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        setErro(error.message);
      }
    };
    consulta();
  }, []);

  if (erro) {
    return <div>Erro ao acessar o endpoint da Api: {erro}</div>;
  }

  return (
    <>
      <h2>Catálogo</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Custo</th>
            <th>Quantidade</th>
            <th>Imagem</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.descricao}</td>
              <td>{produto.custo}</td>
              <td>{produto.quantidadeNoEstoque}</td>
              <td>
                <img
                  src={ConverteBase64ToImage(produto.imagem)}
                  alt="Imagem "
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ConsultaCatalogo;
