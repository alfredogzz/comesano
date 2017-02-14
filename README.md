# ComeSano
Encuentra opciones  para comer sanas ( y vegetarianas) facilmente.

###Requerimientos
<table>
<tr>
<td>Name</td>
<td>Version</td>
</tr>

<tr>
<td>Node</td>
<td>>= 4.x</td>
</tr>

<tr>
<td>Python</td>
<td>>=2.7.x</td>
</tr>

<tr>
<td>Pip</td>
<td>>=2.1.x</td>
</tr>

<tr>
<td>Bower</td>
<td>>=1.7.x</td>
</tr>
</table>
###To run:

Instalar dependencias

```
npm install
pip install --upgrade -r requirements.txt
```
Crear Base De Datos
```
psql
     CREATE DATABASE comesano;
     \q
```
Configurar setting.py para tu PSQL

Levantar el servidor con 
```
python manage.py migrate
python manage.py runserver
```

[localhost](http://localhost:8000)
