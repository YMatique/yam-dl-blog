<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Mensagem de Contato</title>
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
            padding: 30px 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .email-header .icon {
            font-size: 48px;
            margin-bottom: 10px;
        }

        .email-body {
            padding: 30px 20px;
        }

        .info-panel {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .info-panel p {
            margin: 8px 0;
            font-size: 14px;
        }

        .info-panel strong {
            color: #667eea;
            font-weight: 600;
        }

        .message-section {
            margin: 30px 0;
        }

        .message-section h2 {
            color: #333333;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .message-content {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 15px;
            line-height: 1.8;
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

        .email-link {
            text-align: center;
            margin-top: 15px;
        }

        .email-link a {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
        }

        .email-footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }

        .email-footer p {
            margin: 5px 0;
        }

        .divider {
            height: 1px;
            background-color: #e9ecef;
            margin: 30px 0;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>Nova Mensagem de Contato</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <p style="font-size: 16px; color: #6c757d;">
                Você recebeu uma nova mensagem através do formulário de contato do <strong>YAM DL</strong>.
            </p>

            <!-- Info Panel -->
            <div class="info-panel">
                <p><strong>De:</strong> {{ $name }}</p>
                <p><strong>Email:</strong> <a href="mailto:{{ $email }}"
                        style="color: #667eea; text-decoration: none;">{{ $email }}</a></p>
                <p><strong>Assunto:</strong> {{ $subject }}</p>
            </div>

            <div class="divider"></div>

            <!-- Message Section -->
            <div class="message-section">
                <h2>💬 Mensagem:</h2>
                <div class="message-content">{{ $messageContent }}</div>
            </div>

            <div class="divider"></div>

            <!-- Actions -->
            <!-- <h2 style="color: #333333; font-size: 18px; font-weight: 600; text-align: center; margin-bottom: 20px;">
                🎯 Ações Rápidas
            </h2> -->

            <div class="button-container">
                {{-- <a href="mailto:{{ $email }}?subject=Re: {{ urlencode($subject) }}" class="button">
                    📧 Responder Email
                </a> --}}
            </div>

            <div class="email-link">
                <a href="mailto:{{ $email }}">{{ $email }}</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>Este email foi gerado automaticamente pelo sistema de contato do YAM DL.</p>
            <p><strong>{{ config('app.name') }}</strong></p>
        </div>
    </div>
</body>

</html>