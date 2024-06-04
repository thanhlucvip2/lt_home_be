clear
echo "Script by https://www.facebook.com/doanthanhluc300420"
echo "Support: Ubuntu/Centos"
echo "Đang nhận diện distro linux"
echo "Vui lòng port để mở cho server (mặc định port 80):"
PORT_DEFAULT=80
read -p "" PORT
if [ -z "$PORT" ]; then
    PORT="$DEFAULT_VALUE"
fi

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
	echo "Đang mở port"
        sudo ufw allow $PORT
        clear
fi
echo "Đang khởi tạo server LT_HOME"
sudo docker-compose up -d
clear
IP=$(curl -s ifconfig.me)
echo "Đang kiểm tra kết nối tới LT_HOME server"
sleep 2
echo -n "- Đang khởi tạo kết nối: " && if curl -s --connect-timeout 1 $IP | grep -q Bad; then echo -e "$(tput setaf 2)ONLINE - Ping thành công đến IP$(tput sgr0)"; else echo -e "$(tput setaf 1)OFFLINE - Không thể Ping đến IP, vui lòng mở port 80$(tput sgr0)"; fi
echo "Address (Địa chỉ): $IP"
echo "Port (Cổng): $PORT"
