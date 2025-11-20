<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, textarea, boolean, number, image
            $table->string('group')->default('general'); // general, seo, newsletter, appearance
            $table->timestamps();
        });


           // Inserir configurações padrão
        $defaultSettings = [
            // General
            ['key' => 'site_name', 'value' => 'YAM DL', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Um blog incrível', 'type' => 'textarea', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => '', 'type' => 'image', 'group' => 'general'],
            ['key' => 'site_favicon', 'value' => '', 'type' => 'image', 'group' => 'general'],
            ['key' => 'contact_email', 'value' => 'contato@exemplo.com', 'type' => 'text', 'group' => 'general'],
            
            // SEO
            ['key' => 'meta_description', 'value' => '', 'type' => 'textarea', 'group' => 'seo'],
            ['key' => 'meta_keywords', 'value' => '', 'type' => 'textarea', 'group' => 'seo'],
            ['key' => 'google_analytics', 'value' => '', 'type' => 'text', 'group' => 'seo'],
            ['key' => 'google_site_verification', 'value' => '', 'type' => 'text', 'group' => 'seo'],
            ['key' => 'facebook_pixel', 'value' => '', 'type' => 'text', 'group' => 'seo'],
            
            // Newsletter
            ['key' => 'newsletter_enabled', 'value' => 'true', 'type' => 'boolean', 'group' => 'newsletter'],
            ['key' => 'newsletter_welcome_text', 'value' => 'Obrigado por se inscrever!', 'type' => 'textarea', 'group' => 'newsletter'],
            ['key' => 'newsletter_confirmation_required', 'value' => 'true', 'type' => 'boolean', 'group' => 'newsletter'],
            
            // Appearance
            ['key' => 'primary_color', 'value' => '#3b82f6', 'type' => 'color', 'group' => 'appearance'],
            ['key' => 'posts_per_page', 'value' => '10', 'type' => 'number', 'group' => 'appearance'],
            ['key' => 'show_author', 'value' => 'true', 'type' => 'boolean', 'group' => 'appearance'],
            ['key' => 'show_date', 'value' => 'true', 'type' => 'boolean', 'group' => 'appearance'],
            
            // Comments
            ['key' => 'comments_enabled', 'value' => 'true', 'type' => 'boolean', 'group' => 'comments'],
            ['key' => 'comments_moderation', 'value' => 'false', 'type' => 'boolean', 'group' => 'comments'],
        ];

        DB::table('settings')->insert($defaultSettings);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
