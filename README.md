# 🧠 PerceptAI — Detecção de Emoções Faciais para Pacientes de UTI

<p align="center">
  <img src="./assets/images/icon.png" alt="PerceptAI Logo" width="120" />
</p>

<p align="center">
  <strong>Aplicativo mobile de apoio à comunicação de pacientes de UTI com dificuldade de expressão verbal</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-Expo-blue?logo=expo" />
  <img src="https://img.shields.io/badge/.NET-10-purple?logo=dotnet" />
  <img src="https://img.shields.io/badge/Supabase-green?logo=supabase" />
  <img src="https://img.shields.io/badge/MobileNetV2-ONNX-orange" />
  <img src="https://img.shields.io/badge/Acurácia-95.38%25-brightgreen" />
</p>

---

## 📖 Descrição do Projeto

O **PerceptAI** é um sistema de detecção de emoções faciais desenvolvido para auxiliar profissionais de saúde no monitoramento de pacientes internados em UTI (Unidade de Terapia Intensiva) que possuem dificuldade ou impossibilidade de comunicação verbal.

Por meio da câmera do celular, o app captura o rosto do paciente, envia a imagem para uma API de inteligência artificial e retorna em tempo real a emoção detectada — como dor, medo, tristeza, enjoo ou sonolência — além de identificar se o paciente está acordado ou dormindo.

### 🎯 Objetivo
Permitir que enfermeiros e médicos de UTI identifiquem rapidamente o estado emocional e físico do paciente, registrem ocorrências e tomem decisões clínicas com mais agilidade e precisão.

### 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| App Mobile | React Native + Expo (TypeScript) |
| Back-end / API | C# + ASP.NET Core (.NET 10) |
| Banco de Dados | Supabase (PostgreSQL) |
| Modelo de IA | MobileNetV2 (PyTorch → ONNX) |
| Inferência | ONNX Runtime (Microsoft.ML.OnnxRuntime) |
| Autenticação | Supabase Auth |

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Python 3.11](https://www.python.org/downloads/)
- [Visual Studio 2022 Community](https://visualstudio.microsoft.com/vs/community/) com workload **ASP.NET and web development**
- Expo CLI global:
  ```bash
  npm install -g expo-cli
  ```
- Celular Android com o **Development Build** do PerceptAI instalado

---

## 🚀 Passo a Passo para Rodar o Projeto

### 🔧 1. Back-end — API C# (ASP.NET Core)

1. **Abra** a solução `PerceptAI.API` no Visual Studio 2022.

2. **Configure** o arquivo `appsettings.json` com suas credenciais. Use o arquivo `appsettings.Example.json` como base:
   ```json
   {
     "Supabase": {
       "Url": "https://SEU_PROJETO.supabase.co",
       "Key": "SUA_ANON_KEY"
     }
   }
   ```
   > ⚠️ O `appsettings.json` **não está no repositório** por segurança. Crie-o manualmente.

3. **Verifique** se a porta 5198 está livre:
   ```bash
   netstat -ano | findstr :5198
   ```
   Se retornar algum processo, encerre-o antes de continuar.

4. **Selecione** o perfil de execução **"http"** na barra do Visual Studio (jamais use IIS Express!).

5. **Pressione F5** para iniciar a API.

6. **Confirme** que o terminal exibe:
   ```
   Now listening on: http://0.0.0.0:5198
   ```

> ⚠️ **Nunca** rode a API pelo terminal **e** pelo Visual Studio ao mesmo tempo — causará conflito de porta!

---

### 📱 2. Front-end — App React Native (Expo)

1. **Instale as dependências** na pasta do projeto:
   ```bash
   npm install
   ```

2. **Descubra seu IP local** (rede Wi-Fi — **não use `localhost`!**):
   ```bash
   ipconfig
   ```
   Procure por **"Endereço IPv4"** na seção do adaptador Wi-Fi. Exemplo: `192.168.1.105`

3. **Crie o arquivo** `.env.local` na raiz do projeto:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=sua_url_aqui
   EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
   EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:5198
   ```
   Substitua `SEU_IP_LOCAL` pelo IP encontrado no passo anterior.

   > ⚠️ O `.env.local` **não está no repositório** por segurança. Crie-o manualmente.

4. **Inicie o servidor Expo** com o Development Client:
   ```bash
   npx expo start --dev-client
   ```

5. **Abra o app PerceptAI** no celular (Development Build) e escaneie o QR Code exibido no terminal.

---

## ⚠️ Avisos Importantes

| Situação | O que fazer |
|---|---|
| Celular não conecta na API | Confirme que celular e PC estão na **mesma rede Wi-Fi** |
| IP mudou após reconectar | Rode `ipconfig` novamente e atualize o `EXPO_PUBLIC_API_URL` no `.env.local` |
| Porta 5198 em uso | Rode `netstat -ano \| findstr :5198` e encerre o processo |
| API não responde | Verifique se selecionou o perfil **"http"** (não IIS Express) no Visual Studio |
| Modelo não carrega | Confirme que `PerceptAI.API/ML/model.onnx` existe (não está no repositório, deve ser gerado com `scripts/train.py`) |

---

## 📂 Arquivos Importantes

### 📱 Front-end (React Native)

| Arquivo | Descrição |
|---|---|
| `app/camera.tsx` | Tela da câmera — captura, comprime e envia imagem para a API |
| `app/index.tsx` | Tela Home |
| `app/anotacao.tsx` | Tela de anotações com calendário |
| `app/alertas.tsx` | Tela de histórico de alertas |
| `app/configuracoes.tsx` | Tela de configurações |
| `app/perfil.tsx` | Tela de perfil do usuário |
| `.env.local` | Variáveis de ambiente (**não está no repositório!**) |

### 🔧 Back-end (ASP.NET Core)

| Arquivo | Descrição |
|---|---|
| `PerceptAI.API/Services/ImagePreprocessingService.cs` | Pré-processa a imagem (resize, normalização, tensor NCHW) |
| `PerceptAI.API/Services/EmotionDetectionService.cs` | Carrega o modelo ONNX e executa a inferência |
| `PerceptAI.API/Services/SupabaseService.cs` | Salva detecções no banco Supabase |
| `PerceptAI.API/Controllers/DetectionController.cs` | Rota `POST /api/detection/detect` |
| `PerceptAI.API/ML/model.onnx` | Modelo treinado (**não está no repositório!**) |
| `PerceptAI.API/appsettings.json` | Configurações da API (**não está no repositório!**) |
| `PerceptAI.API/appsettings.Example.json` | Exemplo de configuração sem credenciais reais |

### 🤖 Scripts de IA (Python)

| Arquivo | Descrição |
|---|---|
| `scripts/train.py` | Pipeline completo de treino do modelo de IA |
| `scripts/evaluate.py` | Avalia o modelo e gera métricas + matriz de confusão |
| `scripts/extract_target_class.py` | Extrai imagens acordado/dormindo do dataset DDD |
| `copy_ddd.py` | Copia 300 imagens do dataset DDD para as pastas de classe |
| `scripts/download_roboflow.py` | Baixa dataset de expressões faciais do Roboflow |
| `scripts/download_neutral_coco.py` | Baixa imagens neutras do COCO dataset |
| `scripts/process_neutral_coco.py` | Processa imagens neutras do COCO |

---

## 🧠 Classes Detectadas pelo Modelo

| Índice | Classe | Descrição |
|:---:|---|---|
| 0 | `dor` | Expressão de dor |
| 1 | `enjoo` | Expressão de enjoo/náusea |
| 2 | `medo` | Expressão de medo |
| 3 | `sono` | Estado de sonolência |
| 4 | `tristeza` | Expressão de tristeza |
| 5 | `neutro` | Expressão neutra |
| 6 | `acordado` | Paciente acordado |
| 7 | `dormindo` | Paciente dormindo |

---

## 📊 Métricas do Modelo

| Métrica | Valor |
|---|---|
| **Acurácia Geral** | **95,38%** |
| **F1-Score Médio** | **91,05%** |
| Arquitetura | MobileNetV2 (transfer learning) |
| Formato de exportação | ONNX |
| Runtime de inferência | Microsoft.ML.OnnxRuntime |

---

## 🗄️ Banco de Dados

O projeto utiliza o **Supabase** como backend de banco de dados. O schema completo está disponível em:

```
supabase_schema.sql
```

Para criar as tabelas, execute o conteúdo desse arquivo no **SQL Editor** do seu projeto Supabase.

---

## 🔒 Segurança

Os seguintes arquivos **não estão no repositório** e devem ser criados manualmente:

- `.env.local` — variáveis de ambiente do front-end (chaves Supabase + IP da API)
- `appsettings.json` — configurações do back-end com credenciais Supabase
- `PerceptAI.API/ML/model.onnx` — modelo treinado (gerado via `scripts/train.py`)

---

## 📄 Licença

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC). Todos os direitos reservados.
