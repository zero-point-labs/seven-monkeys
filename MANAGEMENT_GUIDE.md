# 🎛️ **Complete Management Guide for Seven Monkeys DJ Platform**

## **📋 Management Overview**

After hosting your Icecast server on Hostinger VPS, you have **5 different ways** to manage your platform:

---

## **1. 🖥️ Admin Dashboard (Primary Interface)**

**Access:** `http://localhost:3000/admin`

### **Features:**
- ✅ **Real-time Stream Control** - Start/stop DJ streams
- ✅ **File Management** - Upload/delete audio files
- ✅ **DJ Management** - Add/edit DJ profiles  
- ✅ **Live Monitoring** - Listener counts, server health
- ✅ **VPS Integration** - Direct VPS control

### **How to Use:**
1. **Upload Files:**
   - Go to "File Manager" tab
   - Select DJ (dj1, dj2, dj3, dj4)
   - Click "Upload" button
   - Files are automatically uploaded to VPS

2. **Manage Streams:**
   - Go to "Streaming" tab
   - Start/stop individual streams
   - Monitor real-time stats

3. **Monitor VPS:**
   - Go to "VPS Control" tab
   - View server status
   - Execute quick commands

---

## **2. 🌐 Icecast Admin Interface (Native)**

**Access:** `http://72.60.188.8:8000/admin`
- **Username:** `admin`
- **Password:** `sevenmonkeys2024`

### **Features:**
- ✅ **Mount Point Management** - View all streams
- ✅ **Listener Statistics** - Real-time counts
- ✅ **Stream Information** - Bitrate, format, metadata
- ✅ **Server Configuration** - Basic settings

### **What You Can Do:**
- View active streams and listener counts
- Monitor server performance
- Check stream quality and bitrates
- Access raw Icecast statistics

---

## **3. 📁 File Management (Multiple Options)**

### **Option A: SSH File Transfer**
```bash
# Connect to VPS
ssh root@72.60.188.8

# Navigate to audio directory
cd /opt/seven-monkeys-dj/audio

# List files for specific DJ
ls -la dj1/
ls -la dj2/
ls -la dj3/
ls -la dj4/

# Upload files via SCP (from your local machine)
scp your-audio-file.mp3 root@72.60.188.8:/opt/seven-monkeys-dj/audio/dj1/

# Download files
scp root@72.60.188.8:/opt/seven-monkeys-dj/audio/dj1/your-file.mp3 ./

# Delete files
rm /opt/seven-monkeys-dj/audio/dj1/unwanted-file.mp3
```

### **Option B: Hostinger File Manager**
1. Go to your Hostinger VPS dashboard
2. Click "File Manager" (if available)
3. Navigate to `/opt/seven-monkeys-dj/audio/`
4. Upload/download files directly

### **Option C: SFTP Client**
- **FileZilla, WinSCP, or similar**
- **Host:** `72.60.188.8`
- **Username:** `root`
- **Password:** Your VPS password
- **Path:** `/opt/seven-monkeys-dj/audio/`

---

## **4. 🐳 Docker Management**

### **Via Hostinger Docker Manager:**
1. Go to "Docker Manager" in Hostinger panel
2. Find "seven-monkeys-dj" project
3. Click "Manage" for container controls
4. View logs, restart services, etc.

### **Via SSH Commands:**
```bash
# Connect to VPS
ssh root@72.60.188.8

# Navigate to project
cd /opt/seven-monkeys-dj

# View container status
docker-compose ps

# View logs
docker-compose logs -f icecast
docker-compose logs -f liquidsoap

# Restart services
docker-compose restart icecast
docker-compose restart liquidsoap

# Stop all services
docker-compose down

# Start all services
docker-compose up -d

# Update services
docker-compose pull
docker-compose up -d
```

---

## **5. 🔧 Command Line Management**

### **Essential Commands:**

```bash
# Connect to VPS
ssh root@72.60.188.8

# Check Icecast status
curl http://localhost:8000/status.xsl

# Test stream endpoints
curl -I http://localhost:8000/dj1
curl -I http://localhost:8000/dj2
curl -I http://localhost:8000/dj3
curl -I http://localhost:8000/dj4

# Check disk usage
df -h /opt/seven-monkeys-dj

# Check memory usage
free -h

# Monitor system resources
htop

# Check network connections
netstat -tlnp | grep 8000
```

---

## **📊 Daily Management Workflow**

### **Morning Routine:**
1. **Check Admin Dashboard** - `http://localhost:3000/admin`
2. **Verify Stream Status** - All DJs online?
3. **Check Listener Counts** - Any issues?
4. **Review Server Health** - VPS status OK?

### **File Management:**
1. **Upload New Audio:**
   - Use Admin Dashboard "File Manager" tab
   - Or SSH: `scp file.mp3 root@72.60.188.8:/opt/seven-monkeys-dj/audio/dj1/`

2. **Delete Old Files:**
   - Admin Dashboard: Click delete button
   - Or SSH: `rm /opt/seven-monkeys-dj/audio/dj1/old-file.mp3`

### **Stream Control:**
1. **Start Stream:** Admin Dashboard → Streaming → Start Stream
2. **Stop Stream:** Admin Dashboard → Streaming → Stop Stream
3. **Monitor:** Real-time listener counts and server stats

---

## **🚨 Troubleshooting Common Issues**

### **Stream Not Working:**
```bash
# Check Icecast logs
docker-compose logs icecast

# Restart Icecast
docker-compose restart icecast

# Check if port 8000 is open
netstat -tlnp | grep 8000
```

### **Files Not Uploading:**
```bash
# Check disk space
df -h

# Check permissions
ls -la /opt/seven-monkeys-dj/audio/

# Fix permissions if needed
chmod -R 755 /opt/seven-monkeys-dj/audio/
```

### **High Memory Usage:**
```bash
# Check memory usage
free -h

# Restart services
docker-compose restart

# Check for memory leaks
docker stats
```

---

## **📈 Monitoring & Maintenance**

### **Daily Checks:**
- ✅ Stream status and listener counts
- ✅ Server health and resource usage
- ✅ Audio file organization
- ✅ Error logs

### **Weekly Tasks:**
- ✅ Clean up old audio files
- ✅ Update DJ profiles if needed
- ✅ Check disk space usage
- ✅ Review error logs

### **Monthly Tasks:**
- ✅ Update Docker images
- ✅ Backup configuration files
- ✅ Review and optimize performance
- ✅ Security updates

---

## **🔐 Security Best Practices**

### **File Access:**
- Use SSH keys instead of passwords
- Limit file permissions (755 for directories, 644 for files)
- Regular backups of important files

### **Stream Security:**
- Change default Icecast passwords
- Use firewall rules to limit access
- Monitor for unusual traffic patterns

---

## **📱 Mobile Management**

### **Admin Dashboard Mobile:**
- Responsive design works on mobile
- Touch-friendly interface
- Real-time updates

### **Quick Mobile Commands:**
```bash
# Quick status check
curl http://72.60.188.8:8000/status.xsl

# Quick restart
ssh root@72.60.188.8 "cd /opt/seven-monkeys-dj && docker-compose restart icecast"
```

---

## **🎯 Recommended Management Strategy**

### **Primary Method: Admin Dashboard**
- Use `http://localhost:3000/admin` for daily management
- Upload files, control streams, monitor status
- Most user-friendly interface

### **Secondary Method: SSH Commands**
- Use SSH for advanced operations
- File management, system monitoring
- Troubleshooting and maintenance

### **Backup Method: Hostinger Panel**
- Use Hostinger Docker Manager for container control
- File Manager for bulk file operations
- System monitoring and resource management

---

## **🎉 Success!**

You now have **complete control** over your Seven Monkeys DJ Platform! The combination of the Admin Dashboard, SSH access, and Hostinger's management tools gives you everything you need to run a professional DJ streaming service.

**Quick Start Checklist:**
- ✅ Admin Dashboard: `http://localhost:3000/admin`
- ✅ Icecast Admin: `http://72.60.188.8:8000/admin`
- ✅ SSH Access: `ssh root@72.60.188.8`
- ✅ File Upload: Admin Dashboard → File Manager
- ✅ Stream Control: Admin Dashboard → Streaming

**Need Help?** Check the troubleshooting section or use the Admin Dashboard's built-in help features!
