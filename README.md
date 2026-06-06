# 🧠 PerceptAI — Sistema Assistivo de Cuidado

O **PerceptAI** é um aplicativo móvel voltado ao cuidado assistivo de pessoas com mobilidade reduzida. O aplicativo utiliza a câmera do dispositivo em tempo real para capturar frames, enviando-os para um modelo de Inteligência Artificial capaz de classificar microexpressões faciais e alertar cuidadores instantaneamente caso detecte estados de dor ou mal-estar no paciente sob cuidados.

---

## 🎨 Emoções Detectadas

O modelo de IA monitora e identifica as seguintes **5 microexpressões**:
1. **Medo**
2. **Enjoo** (Mal-estar)
3. **Dor**
4. **Sono**
5. **Tristeza**

---

## 🏗️ Arquitetura do Sistema

O ecossistema é composto por **3 componentes principais** trabalhando em conjunto:

```
[ Celular / React Native ] --(Frame Base64)--> [ API ASP.NET Core C# ]
            |                                         |
            | (Leitura / Escrita / Realtime)          | (Detecção / ONNX / MobileNetV2)
            v                                         v
   [ ----------------------- Supabase Database ----------------------- ]
```

1. **Front-end (React Native com Expo)**: Aplicativo móvel que realiza a captura de imagens pela câmera, exibe o status de detecção, dispara notificações e mantém um histórico com sincronização em tempo real.
2. **Back-end (PerceptAI.API em ASP.NET Core)**: Web API desenvolvida em C# que recebe o frame codificado, realiza o pré-processamento e executa a inferência de IA usando a biblioteca do **ONNX Runtime** com o modelo MobileNetV2.
3. **Banco de Dados (Supabase)**: Serviço de persistência baseado em PostgreSQL que armazena usuários, pacientes, logs de detecções e envia notificações ao vivo usando **Websockets (Realtime)**.

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de que sua máquina atende às seguintes dependências:
* **Node.js** (versão 18 ou superior) & **Expo CLI**
* **Python 3.11** (com PyTorch e a CLI do Kaggle instalados para o treino)
* **Visual Studio** (com cargas de trabalho de desenvolvimento web .NET 10.0)
* **Conta no Supabase** (para provisionar o banco de dados)
* **Conta no Kaggle** (com o arquivo `kaggle.json` configurado na pasta do seu usuário do Windows `~/.kaggle/`)

---

## 🚀 Como Rodar o Projeto

Siga a ordem ideal de execução para colocar o ecossistema no ar:

### 1. Configurar o Supabase
* Crie um projeto no painel do [Supabase](https://supabase.com/).
* Acesse a ferramenta **SQL Editor** no painel do projeto.
* Abra o arquivo [supabase_schema.sql](file:///c:/Users/Solange/Desktop/perceptAI/supabase_schema.sql), copie todo o seu conteúdo, cole no editor do painel e clique em **Run** para criar as tabelas e ativar a sincronização em tempo real (Realtime).
* Copie o link da sua **Project URL** e a chave de acesso público **anon Key** em *Project Settings -> API*.

### 2. Configurar o arquivo `.env` do Front-end
* Abra o arquivo [.env](file:///c:/Users/Solange/Desktop/perceptAI/.env) na raiz do projeto `perceptAI`.
* Preencha as chaves do Supabase e o endereço IP correto da API C#:
  ```env
  EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
  EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
  EXPO_PUBLIC_API_URL=http://localhost:5246
  ```
  > [!TIP]
  > Se for testar no **emulador Android**, utilize `http://10.0.2.2:5246`. Se for testar no seu **celular físico (Expo Go)**, utilize o IP local da sua máquina de desenvolvimento (ex: `http://192.168.1.50:5246`).

### 3. Treinar o Modelo de Inteligência Artificial
* No terminal, acesse a pasta de scripts do Python:
  ```bash
  cd scripts
  ```
* Execute o pipeline automático de treinamento e exportação:
  ```bash
  python train.py
  ```
  * *Este comando baixará os datasets do Kaggle, preparará a estrutura de pastas por classe, fará o Fine-Tuning do classificador MobileNetV2 e gerará o arquivo `model.onnx` diretamente na pasta `PerceptAI.API/ML/model.onnx`.*

### 4. Rodar a API C# no Visual Studio
* Abra a pasta `PerceptAI.API` utilizando o **Visual Studio**.
* Verifique se o arquivo `ML/model.onnx` foi exportado com sucesso no passo anterior.
* Clique no botão **Play** ou pressione **F5** para iniciar o servidor ASP.NET Core local. O Swagger abrirá automaticamente.

### 5. Rodar o Aplicativo Móvel (React Native)
* No terminal, volte para a raiz da pasta `perceptAI`.
* Inicialize o servidor do Expo:
  ```bash
  npm run start
  ```
* Escaneie o QR Code exibido com o aplicativo **Expo Go** no seu celular ou pressione `a` para executar no emulador Android.

---

## 📂 Estrutura de Pastas Principal

### Front-end (`perceptAI`)
```text
perceptAI/
├── app/                  # Telas principais e rotas do Expo Router
│   ├── (tabs)/           # Abas de navegação (Histórico, Anotações, Perfil)
│   ├── camera.tsx        # Tela de captura e inferência da câmera
│   └── login.tsx         # Tela de autenticação
├── components/           # Componentes UI reutilizáveis (botões, modais)
├── scripts/              # Scripts Python para download, treino e ONNX
│   ├── train.py          # Script principal de treino da IA
│   └── export_onnx.py    # Script de exportação (opcional/auxiliar)
├── services/             # Lógica de conexão (Supabase Client e Auth)
│   ├── api.ts            # Queries do Supabase
│   └── auth.ts           # Cadastro e login com Supabase Auth
└── types/                # Definições de tipos do TypeScript
```

### Back-end (`PerceptAI.API`)
```text
PerceptAI.API/
├── Controllers/
│   └── DetectionController.cs   # Endpoint POST /api/detection/detect
├── ML/
│   └── model.onnx               # Arquivo binário da IA exportado
├── Models/
│   ├── DetectionRequest.cs      # Modelo de entrada (Base64 + PatientId)
│   └── DetectionResponse.cs     # Modelo de resposta (Emotion + Confidence)
├── Services/
│   ├── ImagePreprocessingService.cs # Resize 224x224 e normalização
│   └── EmotionDetectionService.cs    # Inferência com ONNX Runtime
└── Program.cs                   # Configuração de serviços e CORS
```
