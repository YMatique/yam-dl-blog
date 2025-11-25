<x-mail::message>
# Olá, {{ $subscriber->name }}!

Acabamos de publicar um novo artigo que pode ser do seu interesse:

<x-mail::panel>
## {{ $article->title }}

{{ $article->excerpt }}
</x-mail::panel>

<x-mail::button :url="$article->getUrl()">
Ler Artigo Completo
</x-mail::button>

Se você não deseja mais receber estes emails, pode <a href="{{ $subscriber->getUnsubscribeUrl() }}">cancelar sua inscrição aqui</a>.

Atenciosamente,<br>
{{ config('app.name') }}
</x-mail::message>
