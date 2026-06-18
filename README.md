# 🧠 PerceptAI — Sistema Assistivo de Cuidado

O **PerceptAI** é um aplicativo móvel voltado ao cuidado assistivo de pessoas com mobilidade reduzida (tetraplegia, quadriplegia). O app usa a câmera do dispositivo para capturar e analisar microexpressões faciais em tempo real, identificando estados de desconforto e alertando o cuidador instantaneamente.

---

## 🎨 Emoções Detectadas

O modelo de IA monitora e identifica as seguintes **5 microexpressões**:

| #   | Emoção       | Dataset de Origem                           |
| --- | ------------ | ------------------------------------------- |
| 1   | **Medo**     | CK+48 (fear)                                |
| 2   | **Enjoo**    | CK+48 (disgust)                             |
| 3   | **Dor**      | Pain Detection Face Expressions             |
| 4   | **Sono**     | Drowsiness Detection (yawning + microsleep) |
| 5   | **Tristeza** | CK+48 (sadness)                             |

---

## 🏗️ Arquitetura do Sistema

```
[ Celular / React Native ] --(Frame Base64)--> [ API ASP.NET Core C# ]
            |                                         |
            | (Leitura / Escrita / Realtime)          | (Inferência ONNX / MobileNetV2)
            v                                         v
   [ -------------------- Supabase (PostgreSQL) -------------------- ]
```

1. **Front-end (React Native + Expo)** — Captura frames, exibe detecções, envia alertas e mantém histórico em tempo real
2. **Back-end (PerceptAI.API em ASP.NET Core C#)** — Recebe o frame em Base64, pré-processa e executa inferência com ONNX Runtime
3. **Banco de Dados (Supabase)** — Persiste usuários, pacientes, detecções e alertas com Realtime via WebSockets

---

## ⚙️ Pré-requisitos

- **Node.js** 18+ e **Expo CLI**
- **Python 3.11** com `torch`, `torchvision`, `kaggle`, `onnx`, `onnxscript`
- **Visual Studio 2022+** com carga de trabalho **ASP.NET e desenvolvimento Web** (.NET 10)
- **Conta no Supabase** — [supabase.com](https://supabase.com)
- **Conta no Kaggle** com `kaggle.json` em `C:\Users\<seu-usuario>\.kaggle\kaggle.json`
- **Expo Go** instalado no celular (Android ou iOS)

---

## 📦 Dependências Principais (Front-end)

| Pacote                                      | Versão    | Função                               |
| ------------------------------------------- | --------- | ------------------------------------ |
| `expo`                                      | ^54.0.0   | Framework base                       |
| `expo-router`                               | ~6.0.23   | Navegação por arquivos               |
| `expo-camera`                               | ~17.0.10  | Captura de frames                    |
| `@supabase/supabase-js`                     | ^2.106.1  | Cliente do banco de dados            |
| `@react-native-async-storage/async-storage` | 2.2.0     | Persistência local (sessão Supabase) |
| `react-native-gesture-handler`              | ~2.28.0   | Gestos e navegação                   |
| `react-native-reanimated`                   | ~4.1.1    | Animações                            |
| `react-native-safe-area-context`            | ~5.6.0    | Áreas seguras de tela                |
| `react-native-calendars`                    | ^1.1314.0 | Calendário de histórico              |
| `@react-navigation/drawer`                  | ^7.5.0    | Menu lateral                         |
| `@expo-google-fonts/poppins`                | ^0.4.1    | Tipografia                           |

---

## 🚀 Como Rodar o Projeto

Siga a ordem abaixo para colocar o ecossistema no ar:

### 1. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Acesse **SQL Editor → New Query**
3. Cole o conteúdo de `supabase_schema.sql` e clique em **Run**
4. Copie em **Settings → API**:
   - `Project URL`
   - `anon public key`

### 2. Configurar o `.env` do Front-end

Abra `.env` na raiz do projeto `perceptAI` e preencha:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
EXPO_PUBLIC_API_URL=http://10.0.2.2:5198
```

> **Dica:** Use `http://10.0.2.2:5198` para emulador Android, ou o IP local da máquina (ex: `http://192.168.1.50:5198`) para celular físico via Expo Go na mesma rede Wi-Fi.

### 3. Treinar o Modelo de IA

```bash
cd C:\Users\<seu-usuario>\Desktop\perceptAI\scripts
python train.py
```

O script irá:

- Baixar os datasets do Kaggle automaticamente
- Organizar as imagens nas 5 classes
- Treinar o MobileNetV2 por 5 épocas (~99% de acurácia)
- Exportar `model.onnx` para `PerceptAI.API/ML/model.onnx`

### 4. Rodar a API C# no Visual Studio

1. Abra `C:\Users\<seu-usuario>\Desktop\PerceptAI.API` no Visual Studio
2. Confirme que `ML/model.onnx` existe
3. Pressione **F5** ou clique em **Play**
4. Acesse a documentação interativa em: `http://localhost:5198/scalar/v1`

### 5. Rodar o App

```bash
cd C:\Users\<seu-usuario>\Desktop\perceptAI
npm run start
```

- Escaneie o QR Code com o **Expo Go**
- Ou pressione `a` para abrir no emulador Android

---

## 📂 Estrutura de Pastas

### Front-end (`perceptAI`)

```
perceptAI/
├── app/
│   ├── (tabs)/               # Abas: Home, Anotações, Configurações, Perfil
│   ├── camera.tsx            # Captura de frame e envio para API
│   ├── historico.tsx         # Histórico com Realtime do Supabase
│   ├── login.tsx             # Autenticação
│   ├── cadastro.tsx          # Cadastro de cuidador
│   └── anotacao-nova.tsx     # Nova anotação manual
├── components/
│   ├── buttons/              # LoginButton, PrimaryButton, etc.
│   ├── header/               # Header global
│   ├── modals/               # Modais: ajuda, calendário, configdeteccao
│   └── navigation/           # CustomDrawer
├── scripts/
│   ├── train.py              # Pipeline completo de treino e exportação ONNX
│   └── export_onnx.py        # Exportação auxiliar
├── services/
│   ├── api.ts                # Queries do Supabase
│   ├── auth.ts               # Login, cadastro e sessão
│   └── supabaseClient.ts     # Configuração do cliente Supabase
├── styles/                   # Estilos por tela (não modificar)
├── types/
│   ├── emotion.ts            # Tipos de emoções e detecções
│   └── user.ts               # Tipos de usuário e paciente
└── .env                      # Variáveis de ambiente (não versionar)
```

### Back-end (`PerceptAI.API`)

```
PerceptAI.API/
├── Controllers/
│   └── DetectionController.cs    # POST /api/detection/detect
├── ML/
│   └── model.onnx                # Modelo exportado (gerado pelo train.py)
├── Models/
│   ├── DetectionRequest.cs       # { image: base64, patientId: uuid }
│   └── DetectionResponse.cs      # { emotion, confidence, timestamp }
├── Services/
│   ├── ImagePreprocessingService.cs  # Decode Base64 → resize 224x224 → normalizar
│   └── EmotionDetectionService.cs    # Inferência ONNX + Softmax
├── appsettings.json              # Threshold (padrão: 0.75)
└── Program.cs                    # CORS, Scalar, injeção de dependências
```

---

## 🗄️ Banco de Dados (Supabase)

| Tabela        | Descrição                                               |
| ------------- | ------------------------------------------------------- |
| `users`       | Cuidadores e pacientes (tipo: `cuidador` \| `paciente`) |
| `patients`    | Pacientes vinculados a um cuidador                      |
| `detections`  | Histórico de detecções (emoção + confiança + timestamp) |
| `annotations` | Anotações manuais do cuidador                           |
| `alerts`      | Alertas gerados por detecções críticas                  |

Realtime habilitado nas tabelas `detections` e `alerts`.

---

## 🐛 Problemas Conhecidos e Soluções

| Problema                                   | Causa                                                 | Solução                                                          |
| ------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------------------------- |
| Conflitos de merge nos arquivos `.tsx`     | Merge simultâneo de branches                          | Resolvidos mantendo a versão HEAD com integrações do Supabase    |
| `AsyncStorageError: Native module is null` | Supabase usando AsyncStorage legado com Expo Go       | Configurar `storage: AsyncStorage` no `createClient` do Supabase |
| `SafeAreaView` depreciado                  | Uso do componente do React Native puro                | Substituir pela versão de `react-native-safe-area-context`       |
| Swagger retornando 404 no .NET 10          | .NET 10 não inclui Swagger por padrão                 | Substituído pelo **Scalar** em `/scalar/v1`                      |
| Dataset de sono com 0 imagens              | Imagens em subpastas `train/images/` e `test/images/` | `train.py` atualizado para buscar recursivamente                 |
| `Network request failed` no cadastro       | URL do Supabase incorreta no `.env`                   | Verificar variáveis do `.env` e conexão de rede                  |
| Porta da API diferente do `.env`           | Visual Studio atribui porta automaticamente           | Atualizar `EXPO_PUBLIC_API_URL` com a porta correta (5198)       |

---

## 👩‍💻 Desenvolvido por

Projeto acadêmico — TCC  
Tecnologias: React Native · Expo · ASP.NET Core · ONNX Runtime · MobileNetV2 · Supabase · Python · PyTorch
