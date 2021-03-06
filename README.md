# Прототип трехмерного графического редактора с возможностью совместного редактирования в реальном времени

Автор: Ярослав Сергиенко

## Демо

http://95.179.131.108:3333

* Каждый подключающийся пользователь получает случайный цвет своей кисти. 
* Левой кнопки мыши можно рисовать в плоскости перед камерой.
* Правой кнопкой вращается камера.
* Колесом прокрутки камера движется вперед-назад (не путать с увеличением).
* До синхронизации с сервером каждый мазок кисти рисуется пустым внутри (что-то вроде optimistic update)
* Сервер хранит данные в виде кольцевого буффера заданного размера (по умолчанию 5 000 мазков).

## Технологии

* Socket.io
* Flask (Python 3) на сервере.
* React, Webpack etc. ([Create React App](https://github.com/facebook/create-react-app))
* Typescript
* Storybook
* TSLint, Prettier
* ramda, gl-matrix

## Запуск

```
cd backend && FLASK_APP=server.py BUFFER_SIZE=5000 flask run -h 0.0.0.0 -p 3333
```

## Компиляция статичной сборки из исходных кодов

Если фронтэнд предполагается раздавать с того же сервера, на котором находится бэкенд, следует набрать:

```
REACT_APP_BACKEND=/ npm run build
```

Иначе следует указать адрес сервера, к которому следует обращаться:
```
REACT_APP_BACKEND=http://95.179.131.108:3333 npm run build
```

Также следует обратить внимание на поле `homepage` файла `package.json`. Оно должно соотетствовать префиксу, с которого будет раздаваться папка `dist`.

## Авто-обновляющаяся версия для разработки

```
REACT_APP_BACKEND=http://95.179.131.108:3333 npm start
```

## Storybook

Для большего удобства разработки рекомендуется использовать Storybook:

```
STORYBOOK_BACKEND=http://95.179.131.108:3333 npm start
```

Он будет запущен на 6006 порту и будет использовать API с 3333 порта.
