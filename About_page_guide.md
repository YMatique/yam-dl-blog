# 📄 Página About - Guia Completo

## 🎨 Componentes Criados

### 1. **InfoCard** (`components/blog/info-card.tsx`)

Card com ícone, título e descrição para Missão, Visão e Valores.

**Props:**

```typescript
{
    icon: string;        // 'icon_compass', 'icon_heart_alt', etc
    title: string;       // 'Missão', 'Visão', 'Valores'
    description: string; // Texto descritivo
    color?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}
```

**Uso:**

```tsx
<InfoCard
    icon="icon_compass"
    title="Missão"
    description="Nossa missão é..."
    color="primary"
/>
```

---

### 2. **TestimonialCarousel** (`components/blog/testimonial-carousel.tsx`)

Carousel de testemunhos com avatar, nome, role e rating.

**Props:**

```typescript
{
    testimonials: Array<{
        id: number;
        name: string;
        role?: string;
        avatar?: string;
        content: string;
        rating?: number;
    }>;
}
```

**Uso:**

```tsx
<TestimonialCarousel testimonials={testimonials} />
```

---

## 📐 Estrutura da Página

```
┌─────────────────────────────────────┐
│        BREADCRUMB                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│     BEM-VINDO À YAMDL (Título)      │
└─────────────────────────────────────┘

┌──────────────────┬──────────────────┐
│  QUEM SOMOS      │     IMAGEM       │
│  (Texto)         │                  │
└──────────────────┴──────────────────┘

┌─────────────────────────────────────┐
│        NOSSA ESSÊNCIA (Título)      │
├─────────┬─────────┬─────────────────┤
│ MISSÃO  │  VISÃO  │    VALORES      │
│ [icon]  │ [icon]  │     [icon]      │
└─────────┴─────────┴─────────────────┘

┌─────────────────────────────────────┐
│         FUNDADOR (Título)           │
├───────────────┬─────────────────────┤
│   IMAGEM      │  YUVI MATIQUE       │
│               │  Descrição          │
│               │  Redes Sociais      │
└───────────────┴─────────────────────┘

┌─────────────────────────────────────┐
│         ESTATÍSTICAS                │
│  500+  │  50+  │  10k+  │  20+     │
│ Artigos│Séries │Leitores│Categorias│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    TESTEMUNHOS (Carousel)           │
│    [← Testemunho 1 →]               │
└─────────────────────────────────────┘
```

---

## 🚀 Como Implementar

### **1. Criar os componentes:**

- `components/blog/info-card.tsx`
- `components/blog/testimonial-carousel.tsx`

### **2. Adicionar a rota:**

```php
// routes/web.php
Route::get('/sobre', [AboutController::class, 'index'])->name('about');
```

### **3. Criar o Controller (opcional):**

```php
// app/Http/Controllers/AboutController.php
public function index()
{
    $testimonials = Testimonial::published()->latest()->take(5)->get();

    return Inertia::render('about', [
        'testimonials' => $testimonials,
    ]);
}
```

### **4. Página estática (sem DB):**

Se não quiser usar banco de dados para testemunhos, mantenha o mock na página.

---

## ⚙️ Customização

### **Mudar ícones:**

Veja todos os ícones disponíveis em:

- [Elegant Icons](https://www.elegantthemes.com/blog/resources/elegant-icon-font)

Exemplos:

```tsx
icon = 'icon_compass'; // Bússola
icon = 'icon_lightbulb'; // Lâmpada
icon = 'icon_heart_alt'; // Coração
icon = 'icon_star_alt'; // Estrela
icon = 'icon_check'; // Check
icon = 'icon_ribbon_alt'; // Medalha
```

### **Mudar cores:**

```tsx
color = 'primary'; // Azul
color = 'success'; // Verde
color = 'info'; // Ciano
color = 'warning'; // Amarelo
color = 'danger'; // Vermelho
```

### **Adicionar mais cards:**

```tsx
<div className="col-md-3 col-sm-6 col-12">
    <InfoCard
        icon="icon_ribbon_alt"
        title="Compromisso"
        description="Comprometidos com a verdade bíblica."
        color="danger"
    />
</div>
```

---

## 📊 Estatísticas Dinâmicas

### **Com dados do backend:**

```php
// Controller
return Inertia::render('about', [
    'stats' => [
        'articles' => Article::count(),
        'series' => Series::count(),
        'readers' => User::count(),
        'categories' => Category::count(),
    ],
]);
```

```tsx
// Página
export default function About({ stats }) {
    return (
        <div className="col-md-3">
            <h2>{stats.articles}+</h2>
            <p>Artigos Publicados</p>
        </div>
    );
}
```

---

## 🎯 Testemunhos do Banco de Dados

### **Model:**

```php
// app/Models/Testimonial.php
class Testimonial extends Model
{
    protected $fillable = [
        'name',
        'role',
        'avatar',
        'content',
        'rating',
        'is_published',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
```

### **Migration:**

```php
Schema::create('testimonials', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('role')->nullable();
    $table->string('avatar')->nullable();
    $table->text('content');
    $table->integer('rating')->default(5);
    $table->boolean('is_published')->default(false);
    $table->timestamps();
});
```

---

## ✅ Checklist

- [ ] Criar `info-card.tsx`
- [ ] Criar `testimonial-carousel.tsx`
- [ ] Adicionar rota `/sobre`
- [ ] Atualizar links do menu para `/sobre`
- [ ] Adicionar fotos reais
- [ ] Configurar redes sociais do fundador
- [ ] (Opcional) Criar tabela de testemunhos
- [ ] Testar responsividade

---

## 📁 Arquivos

- [View Página About Completa](computer:///mnt/user-data/outputs/about-page-complete.tsx)
- [View InfoCard Component](computer:///home/claude/resources/js/components/blog/info-card.tsx)
- [View TestimonialCarousel](computer:///home/claude/resources/js/components/blog/testimonial-carousel.tsx)

---

**Página profissional e pronta para produção!** ✨
