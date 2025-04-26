# Trolligono - Aplicativo de Educação Matemática

Trolligono é um aplicativo educacional interativo focado no ensino de geometria, especialmente polígonos. O app oferece quizzes, recursos de aprendizado e feedback visual para ajudar os usuários a entender melhor os conceitos matemáticos de forma divertida e engajadora.

---

## ✨ Funcionalidades

- **Quiz Diário:** Teste seus conhecimentos sobre polígonos com perguntas de múltipla escolha.
- **Recursos de Aprendizado:** Aprenda sobre diferentes formas geométricas e suas propriedades.
- **Feedback Visual:** Receba feedback instantâneo sobre suas respostas e visualize recompensas após completar o quiz.
- **Sistema de Recompensas:** Ao finalizar o quiz, o usuário recebe uma imagem temática como prêmio, de acordo com seu desempenho.
- **Interface Intuitiva:** Navegação simples e visual agradável, adaptada para dispositivos móveis.

---

## 🗂️ Estrutura do Projeto

O projeto é estruturado em várias telas, cada uma com uma funcionalidade específica:

- **Home Screen** (`app/(tabs)/index.tsx`):  
  Tela inicial que dá boas-vindas ao usuário, com botão para iniciar o quiz e link para recursos de aprendizado.

- **Quiz Screen** (`app/(tabs)/quiz-screen.tsx`):  
  Tela onde o usuário responde perguntas sobre polígonos. Exibe perguntas, opções de resposta, explicações e permite avançar para a próxima questão ou ver os resultados.

- **Learn Screen** (`app/(tabs)/learn-screen.tsx`):  
  Tela com informações sobre diferentes polígonos. Permite selecionar um polígono, visualizar propriedades, descrição e acessar exercícios práticos.

- **Gift Screen** (`app/screens/gift-screen.tsx`):  
  Tela de recompensa visual, exibida após o quiz, com animações e imagens temáticas baseadas no desempenho do usuário.

- **Success Screen** (`app/screens/success-screen.tsx`):  
  Tela exibida quando o usuário acerta a maioria das perguntas do quiz. Mostra mensagem de congratulação e imagem de destaque.

- **Error Screen** (`app/screens/error-screen.tsx`):  
  Tela exibida quando o usuário erra a maioria das perguntas. Oferece mensagem de encorajamento e opção de tentar novamente.

- **Not Found Screen** (`app/+not-found.tsx`):  
  Tela exibida quando o usuário tenta acessar uma rota inexistente.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para rodar o Trolligono localmente:

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/Couks/trolligono.git
   cd trolligono
   ```

2. **Instale as Dependências:**
   Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Expo CLI](https://docs.expo.dev/get-started/installation/) instalados.

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Inicie o Servidor de Desenvolvimento:**

   ```bash
   npx expo start
   # ou
   yarn expo start
   ```

4. **Abra o Aplicativo:**
   - Use o aplicativo [Expo Go](https://expo.dev/client) em seu dispositivo móvel para escanear o QR code exibido no terminal ou navegador.
   - Ou utilize um emulador Android/iOS.

---

## 🛠️ Tecnologias Utilizadas

- **React Native:** Desenvolvimento multiplataforma para dispositivos móveis.
- **Expo:** Ferramenta para facilitar o desenvolvimento, build e deploy do app.
- **React Navigation:** Gerenciamento de navegação entre telas.
- **TypeScript:** Tipagem estática para maior segurança e qualidade do código.
- **Jikan API & Dog CEO API:** APIs públicas para imagens de personagens e cachorros, usadas como recompensas visuais.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nome-da-sua-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m 'Adicionando nova feature'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin feature/nome-da-sua-feature
   ```
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Sinta-se à vontade para explorar o código e sugerir melhorias! O Trolligono é uma ótima maneira de aprender sobre polígonos de forma interativa e divertida. 🚀📐
