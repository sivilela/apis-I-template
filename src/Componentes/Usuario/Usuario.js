import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const headers = { headers: { Authorization: "maxuel-lima-krexu" } };

  const getUserById = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setUsuario(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  const corpo = {
    name: nome,
    email: email
  };

  const editUser = () => {
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        corpo,
        headers
      )
      .then(() => {
        alert("Atualizei");
        props.getAllUsers();
        setNome("");
        setEmail("");
        setEditar(!editar);
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  const userDelete = () => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        { headers: { Authorization: "maxuel-lima-krexu" } }
      )
      .then(() => {
        alert("Deletado");
        props.getAllUsers();
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={editUser}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {usuario.name}
          </p>
          <p>
            <strong>E-mail:</strong> {usuario.email}
          </p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={userDelete}>Excluir</button>
    </User>
  );
}

export default Usuario;
