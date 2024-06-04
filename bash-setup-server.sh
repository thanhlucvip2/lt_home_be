clear
echo "Script by https://www.facebook.com/doanthanhluc300420"
echo "Support: Ubuntu/Centos"
echo "Đang nhận diện distro linux"
PORT_SERVER=5000

dist=$(hostnamectl | egrep "Operating System" | cut -f2 -d":" | cut -f2 -d " ")
if [ $dist = "CentOS" ] ; then
	echo "Bạn đang sử dụng CentOS"
	sleep 1
        echo "Đang update hệ thống"
	sudo yum update -y
        clear
	echo" Đang cài đặt phần mềm cần thiết"
        sudo yum install -y yum-utils
        sudo yum-config-manager \
          --add-repo \
          https://download.docker.com/linux/centos/docker-ce.repo
	sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
	sudo systemctl start docker
        clear
        echo "Đang mở port"
        systemctl status firewalld
        firewall-cmd --permanent --add-port=80/tcp
        firewall-cmd --reload
        clear
elif [ $dist = "Ubuntu" -o $dist = "Debian" ] ; then
	echo "Bạn đang sử dụng Ubuntu"
	sleep 1
        echo "Đang update hệ thống"
	sudo apt-get update -y
        clear
	echo "Đang cài đặt phần mềm cần thiết"
	sudo apt install -y docker docker.io
        clear
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        clear
        sudo chmod +x /usr/local/bin/docker-compose
        clear
        docker-compose --version
        clear
	echo "Đang mở port"
        sudo ufw allow $PORT_SERVER
        clear
fi
echo "Đang khởi tạo server LT_HOME"
sudo docker-compose up -d
clear
# IP=$(curl -s ifconfig.me)
echo "Đang kiểm tra kết nối tới LT_HOME server"
sleep 2
PUBLIC_IP=$(curl -s https://icanhazip.com)
echo "Address (Địa chỉ): $PUBLIC_IP"
echo "Address (Địa chỉ): $PUBLIC_IP"
echo "Truy cập địa chỉ này để vào server: http://$PUBLIC_IP:$PORT_SERVER/api"
