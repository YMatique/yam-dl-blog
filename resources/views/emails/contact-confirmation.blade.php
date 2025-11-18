<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recebemos sua Mensagem</title>
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
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background: #667eea;
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 600;
        }

        .email-header .icon {
            font-size: 64px;
            margin-bottom: 15px;
        }

        .email-header p {
            margin: 5px 0;
            font-size: 16px;
            opacity: 0.95;
        }

        .email-body {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 20px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 20px;
        }

        .intro-text {
            font-size: 16px;
            color: #6c757d;
            margin-bottom: 30px;
            line-height: 1.8;
        }

        .summary-section {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 25px;
            margin: 30px 0;
            border-radius: 4px;
        }

        .summary-section h2 {
            color: #333333;
            font-size: 18px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 20px;
        }

        .summary-item {
            margin: 15px 0;
        }

        .summary-item strong {
            color: #667eea;
            font-weight: 600;
            display: block;
            margin-bottom: 5px;
        }

        .summary-item p {
            margin: 5px 0;
            color: #495057;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .info-box {
            background-color: #e7f3ff;
            border: 1px solid #b3d9ff;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }

        .info-box strong {
            color: #0066cc;
            font-size: 16px;
        }

        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            display: inline-block;
            padding: 14px 32px;
            background: #667eea;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
        }

        .button:hover {
            transform: translateY(-2px);
        }

        .tip-box {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
        }

        .tip-box .icon {
            font-size: 24px;
            margin-right: 10px;
        }

        .tip-box p {
            margin: 0;
            color: #856404;
            font-size: 14px;
            line-height: 1.6;
        }

        .tip-box strong {
            color: #856404;
        }

        .divider {
            height: 1px;
            background-color: #e9ecef;
            margin: 30px 0;
        }

        .email-footer {
            background-color: #f8f9fa;
            padding: 30px 20px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }

        .email-footer p {
            margin: 8px 0;
            font-size: 14px;
            color: #6c757d;
        }

        .email-footer .signature {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            margin-top: 20px;
        }

        .email-footer .website {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <!-- <div class="icon">✉️</div> -->
            <h1>Mensagem Recebida!</h1>
            <!-- <p>Obrigado por entrar em contato conosco</p> -->
        </div>

        <!-- Body -->
        <div class="email-body">
            <!-- Greeting -->
            <div class="greeting">Olá, {{ $name }}! 👋</div>

            <!-- Intro -->
            <p class="intro-text">
                Obrigado por entrar em contato conosco através do <strong>YAM DL</strong>.
                Recebemos sua mensagem e retornaremos o mais breve possível.
            </p>

            <div class="divider"></div>

            <!-- Summary Section -->
            <div class="summary-section">
                <h2>📋 Resumo da sua mensagem:</h2>

                <div class="summary-item">
                    <strong>Assunto:</strong>
                    <p>{{ $subject }}</p>
                </div>

                <div class="summary-item">
                    <strong>Mensagem:</strong>
                    <p>{{ $messageContent }}</p>
                </div>
            </div>

            <!-- Response Time Info -->
            <!-- <div class="info-box">
                <strong>⏱️ Tempo estimado de resposta:</strong>
                <p style="margin-top: 8px; color: #0066cc;">24-48 horas (dias úteis)</p>
            </div> -->

            <!-- CTA Button -->
            <p style="text-align: center; font-size: 16px; color: #6c757d; margin: 30px 0 20px 0;">
                Enquanto isso, aproveite para explorar nosso conteúdo:
            </p>

            <div class="button-container">
                <a href="{{ url('/artigos') }}" class="button">
                    📚 Ver Artigos
                </a>
            </div>

            <!-- <div class="divider"></div> -->

            <!-- Tip Box -->
            <!-- <div class="tip-box">
                <p>
                    <span class="icon">💡</span>
                    <strong>Dica:</strong> Adicione <strong>contato@yamdl.com</strong> aos seus contatos
                    para garantir que nossa resposta não vá para o spam.
                </p>
            </div> -->
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p class="signature">Fique na paz! ✝️</p>
            <!-- <p style="font-weight: 600; color: #333333;">Equipe YAM DL</p> -->
            <p>
                <a href="{{ config('app.url') }}" class="website">{{ config('app.url') }}</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px;">
                Este é um email automático. Por favor, não responda diretamente a este email.
            </p>
        </div>
    </div>
</body>

</html>