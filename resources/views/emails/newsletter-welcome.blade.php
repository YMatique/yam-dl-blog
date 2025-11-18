<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao YAM DL</title>
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
            padding: 50px 20px;
            text-align: center;
        }
        .email-header .icon {
            font-size: 80px;
            margin-bottom: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
        }
        .email-body {
            padding: 40px 30px;
        }
        .welcome-text {
            font-size: 18px;
            color: #333333;
            text-align: center;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        .features-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 40px 0;
        }
        .feature-card {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        .feature-card .icon {
            font-size: 36px;
            margin-bottom: 10px;
        }
        .feature-card h3 {
            margin: 10px 0;
            font-size: 16px;
            color: #333333;
        }
        .feature-card p {
            margin: 0;
            font-size: 13px;
            color: #6c757d;
        }
        .button-container {
            text-align: center;
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
        .divider {
            height: 1px;
            background-color: #e9ecef;
            margin: 40px 0;
        }
        .social-section {
            text-align: center;
            margin: 30px 0;
        }
        .social-section h3 {
            color: #333333;
            font-size: 18px;
            margin-bottom: 15px;
        }
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #667eea;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 50%;
            line-height: 40px;
            text-align: center;
            font-size: 20px;
            transition: transform 0.2s;
        }
        .social-link:hover {
            transform: scale(1.1);
        }
        .email-footer {
            background-color: #f8f9fa;
            padding: 30px 20px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .email-footer p {
            margin: 5px 0;
            font-size: 13px;
            color: #6c757d;
        }
        .unsubscribe {
            margin-top: 20px;
        }
        .unsubscribe a {
            color: #6c757d;
            text-decoration: underline;
            font-size: 12px;
        }
        @media only screen and (max-width: 600px) {
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="icon">🎉</div>
            <h1>Bem-vindo ao YAM DL!</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <p class="welcome-text">
                <strong>Subscrição confirmada com sucesso!</strong><br>
                Você agora faz parte da nossa comunidade de crescimento espiritual.
                Prepare-se para receber conteúdo transformador diretamente no seu email.
            </p>

            <!-- Features Grid -->
            <div class="features-grid">
                <div class="feature-card">
                    <div class="icon">📖</div>
                    <h3>Estudos Bíblicos</h3>
                    <p>Aprofunde-se na Palavra com nossos estudos detalhados</p>
                </div>
                <div class="feature-card">
                    <div class="icon">📚</div>
                    <h3>Séries Exclusivas</h3>
                    <p>Conteúdo organizado por temas bíblicos</p>
                </div>
                <div class="feature-card">
                    <div class="icon">✝️</div>
                    <h3>Devocionais</h3>
                    <p>Reflexões diárias para sua jornada cristã</p>
                </div>
                <div class="feature-card">
                    <div class="icon">💡</div>
                    <h3>Insights</h3>
                    <p>Ensinamentos práticos para aplicar no dia a dia</p>
                </div>
            </div>

            <!-- CTA Button -->
            <div class="button-container">
                <a href="{{ url('/artigos') }}" class="button">
                    📚 Explorar Artigos
                </a>
            </div>

            <div class="divider"></div>

            <!-- Social Section -->
            <div class="social-section">
                <h3>Siga-nos nas Redes Sociais</h3>
                <div class="social-links">
                    <a href="#" class="social-link" title="Facebook">f</a>
                    <a href="#" class="social-link" title="Twitter">🐦</a>
                    <a href="#" class="social-link" title="YouTube">▶</a>
                    <a href="#" class="social-link" title="Instagram">📷</a>
                </div>
            </div>

            <p style="text-align: center; font-size: 14px; color: #6c757d; margin-top: 30px;">
                💌 <strong>Frequência de Emails:</strong> Você receberá notificações de novos artigos
                e conteúdos especiais. Não fazemos spam!
            </p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p><strong>YAM DL - Yuvi Albino Matique Digital Library</strong></p>
            <p>Biblioteca Digital para Crescimento Espiritual</p>
            <p>{{ config('app.url') }}</p>
            
            <div class="unsubscribe">
                <p>
                    Não deseja mais receber nossos emails?<br>
                    <a href="{{ $unsubscribeUrl }}">Cancelar subscrição</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>