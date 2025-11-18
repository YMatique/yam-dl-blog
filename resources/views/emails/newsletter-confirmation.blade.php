<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirme sua Subscrição</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .email-header {
            background: #667eea;
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
        }
        .email-header .icon {
            font-size: 64px;
            margin-bottom: 15px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .email-body {
            padding: 40px 30px;
            text-align: center;
        }
        .intro-text {
            font-size: 18px;
            color: #333333;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        .button-container {
            margin: 40px 0;
        }
        .button {
            display: inline-block;
            padding: 16px 40px;
            background: #667eea;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 18px;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
        .info-box {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
        }
        .info-box h3 {
            color: #667eea;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .info-box ul {
            margin: 0;
            padding-left: 20px;
            color: #6c757d;
        }
        .info-box li {
            margin: 8px 0;
        }
        .email-footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="icon">📧</div>
            <h1>Confirme sua Subscrição</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <p class="intro-text">
                Obrigado por se inscrever no <strong>YAM DL</strong>!<br>
                Para começar a receber nossos artigos e novidades, 
                confirme seu email clicando no botão abaixo.
            </p>

            <div class="button-container">
                <a href="{{ $confirmUrl }}" class="button">
                    ✅ Confirmar Subscrição
                </a>
            </div>

            <p style="font-size: 14px; color: #6c757d; margin-top: 30px;">
                Se o botão não funcionar, copie e cole este link no seu navegador:<br>
                <a href="{{ $confirmUrl }}" style="color: #667eea; word-break: break-all;">
                    {{ $confirmUrl }}
                </a>
            </p>

            <div class="info-box">
                <h3>📚 O que você receberá:</h3>
                <ul>
                    <li>Novos artigos de estudos bíblicos</li>
                    <li>Séries exclusivas de ensinamentos</li>
                    <li>Devocionais semanais</li>
                    <li>Conteúdo especial para crescimento espiritual</li>
                </ul>
            </div>

            <p style="font-size: 13px; color: #6c757d; margin-top: 30px;">
                Não solicitou esta subscrição? Ignore este email.
            </p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>Este é um email automático. Por favor, não responda diretamente.</p>
            <p><strong>YAM DL - Yuvi Albino Matique Digital Library</strong></p>
            <p>{{ config('app.url') }}</p>
        </div>
    </div>
</body>
</html>