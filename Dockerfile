# استخدام صورة Node.js كبيئة بناء
FROM node:16 AS build-stage

# تعيين مجلد العمل
WORKDIR /app

# نسخ package.json و package-lock.json
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء المشروع
RUN npm run build

# استخدام صورة Nginx لتشغيل التطبيق
FROM nginx:alpine

# نسخ الملفات المبنية من مرحلة البناء إلى مجلد Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# تعيين PORT الافتراضي
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]