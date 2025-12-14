# Back Almacenadora

Este repositorio está preparado para backend y frontend MERN. Para subir cambios a tu remoto, sigue estos pasos desde tu máquina local o desde este entorno si agregas un `remote` accesible:

1. Verifica el estado del repositorio:
   ```bash
   git status
   ```
2. Agrega los cambios:
   ```bash
   git add .
   ```
3. Crea un commit descriptivo:
   ```bash
   git commit -m "feat: describe brevemente el cambio"
   ```
4. Configura el remoto si aún no existe (reemplaza la URL por la de tu repo):
   ```bash
   git remote add origin <URL-de-tu-repo>
   git remote -v
   ```
5. Sube la rama actual (por ejemplo `work`):
   ```bash
   git push -u origin work
   ```

> Nota: En este entorno no hay remoto configurado; deberás añadirlo con la URL de tu repositorio para que `git push` funcione.
