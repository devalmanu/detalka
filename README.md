<h1><strong>OptimizedHTML:</strong> <br>Startup HTML template based on Gulp & Bootstrap 5</h1>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/OptimizedHTML-4/master/app/img/_src/preview.jpg" alt="Start HTML Template">
</p>

<p>OptimizedHTML — это полнофункциональный HTML5-шаблон стартовой страницы с поддержкой Bootstrap 5 (сетка и перезагрузка), Gulp, Sass, Browsersync, Autoprefixer, Clean-CSS, Uglify, Rsync и Bower (путь к библиотекам). Шаблон содержит файл <strong>.htaccess</strong>  с правилами кэширования для веб-сервера.</p>

<p><strong>OptimizedHTML 4</strong> стартовый шаблон использует лучшие практики веб-разработки.</p>

<p>Кроссбраузерная совместимость: IE9+.</p>

<p>Шаблон использует Sass с синтаксисом <strong>Sass</strong> или <strong>Scss</strong> (опционально).</p>

<h2>Как использовать сборку OptimizedHTML</h2>

<ol>
	<strong>OptimizedHTML 4</strong></li>
	<li>Установка модулей: <strong>npm i</strong>;</li>
	<li>Запуск сборки проекта: <strong>gulp</strong>.</li>
</ol>

<h2>Gulp tasks:</h2>

<ul>
	<li><strong>gulp</strong>: запуск стандартной задачи Gulp (sass, js, watch, browserSync) для веб-разработки;</li>
	<li><strong>rsync</strong>: развёртывание проекта на сервере из папки <strong>dist</strong> через <strong>RSYNC</strong>;</li>
</ul>

<h2>Правила работы со стартовым HTML-шаблоном</h2>

<ol>
	<li>Все файлы HTML должны иметь такое же начальное содержимое, как в <strong>app/index.html</strong>;</li>
	<li><strong>Начало базовых изображений шаблона</strong> комментарий в app/index.html - все ваши базовые изображения шаблона (og:image для социальных сетей, значки для различных устройств);</li>
	<li><strong>Пользовательский цвет заголовка браузера</strong> комментарий в app/index.html: задайте цвет заголовка браузера на различных устройствах;</li>
	<li><strong>Пользовательский HTML-код</strong> в app/index.html — весь ваш HTML-код;</li>
	<li>Чтобы установить новую библиотеку jQuery, просто выполните команду "<strong>bower i plugin-name</strong>" в терминале. Библиотеки автоматически помещаются в папку <strong>app/libs</strong>. Необходимо установить Bower в системе (npm i -g bower). Затем добавьте пути ко всем библиотекам jQuery в задачу <strong>libs</strong> (gulpfile.js);</li>
	<li>Все пользовательские JS-файлы находятся в <strong>app/js/common.js</strong>;</li>
	<li>Все переменные Sass размещены в <strong>app/sass/_vars.sass | app/scss/_vars.scss</strong>;</li>
	<li>Все медиазапросы Bootstrap размещены в <strong>app/sass/_media.sass | app/scss/_media.scss</strong>;</li>
	<li>Все стили CSS библиотек размещены в <strong>app/sass/_libs.sass | app/scss/_libs.scss</strong>;</li>
	<li>Переименуйте файл <strong>ht.access</strong> в <strong>.htaccess</strong> перед размещением на веб-сервере. Этот файл содержит правила кэширования файлов на веб-сервере.</li>
</ol>

<h3>Работа с модальными окнами:</h3>
<p>К вызываюшей кнопке добавляется класс btn-popup, также атрибут data-path со значением совпадающий со значением атрибута data-target модального окна в блоке с классом</p>

<p>Пример:</p>
<code>

	<button class="btn" data-path="form-popup">Окно 1</button>
	<button class="btn" data-path="me-popup">Окно 2</button>
	<div class="modals">
		<div class="modal-overlay">
			<div class="modal modal-wind modal--1" data-target="form-popup">
				Окно 1
			</div>
			<div class="modal modal-wind modal--2" data-target="me-popup">
				Окно 2
			</div>
		</div>
	</div>

</code>