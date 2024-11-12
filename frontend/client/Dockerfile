#Sử dụng image Node.js làm base
FROM node:20 

#Đặt thư mục làm việc chính là /client
WORKDIR /usr/src/app

#Sao chép package.json và packeage-lock.json vào thư mục làm việc
COPY package*.json ./

#Cài đặt các dependeci
RUN npm install

#Sao chép toàn bộ mã nguồn từ thư mục client vào container
COPY . .

#Mở cổng 3000
EXPOSE 3000

#Chạy lệnh npm start
CMD ["npm", "start"]

