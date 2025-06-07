import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, TextInput, Image, Switch
} from 'react-native';

const coursesData = [
  {
    id: '1',
    title: 'Toán cao cấp',
    description: 'Khóa học Toán chuyên sâu cho sinh viên.',
    image: 'https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-7212.jpg',
    instructor: 'Nguyễn Tiến Ngọc',
    lessonsCount: 40,
    duration: '40 giờ',
    rating: 4.5
  },
  {
    id: '1',
    title: 'Cơ sở dữ liệu',
    description: 'Kiến thức về hệ quản trị cơ sở dữ liệu.',
    image: 'https://cdn-icons-png.flaticon.com/512/4290/4290854.png',
    instructor: 'Nguyễn Tiến Ngọc',
    lessonsCount: 35,
    duration: '35 giờ',
    rating: 4.2
  },
  { 
    id: '2',
    title: 'Tiếng Anh giao tiếp',
    description: 'Cải thiện kỹ năng nói và nghe tiếng Anh hàng ngày.',
    image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
    instructor: 'Giảng viên Nguyễn Tiến Ngọc',
    lessonsCount: 30,
    duration: '30 giờ',
    rating: 4.7
  },
  {
    id: '3',
    title: 'Thiết kế UX/UI',
    description: 'Nguyên tắc thiết kế trải nghiệm và giao diện người dùng.',
    image: 'https://cdn-icons-png.flaticon.com/512/3917/3917161.png',
    instructor: 'Nguyễn Tiến Ngọc',
    lessonsCount: 25,
    duration: '25 giờ',
    rating: 4.3
  },
  {
    id: '4',
    title: 'Lập trình Python căn bản',
    description: 'Khóa học Python cho người mới bắt đầu.',
    image: 'https://cdn-icons-png.flaticon.com/512/1822/1822899.png',
    instructor: 'Anh Lê Văn C',
    lessonsCount: 50,
    duration: '50 giờ',
    rating: 4.8
  }
];

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const themeStyles = darkMode ? darkTheme : lightTheme;

  if (!loggedIn) {
    return (
      <View style={[styles.container, themeStyles.container]}>
        <Text style={[styles.title, themeStyles.text]}>Đăng nhập</Text>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Tên đăng nhập"
          placeholderTextColor={darkMode ? '#ccc' : '#888'}
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (username.trim() === '') {
              alert('Vui lòng nhập tên đăng nhập');
              return;
            }
            setLoggedIn(true);
          }}
        >
          <Text style={styles.buttonText}>Vào ứng dụng</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (selectedCourse) {
    return (
      <View style={[styles.container, themeStyles.container]}>
        <Text style={[styles.title, themeStyles.text]}>{selectedCourse.title}</Text>
        <Image source={{ uri: selectedCourse.image }} style={styles.image} />
        <Text style={[styles.description, themeStyles.text]}>{selectedCourse.description}</Text>

        <Text style={[styles.infoText, themeStyles.text]}>
          Giảng viên: {selectedCourse.instructor}
        </Text>
        <Text style={[styles.infoText, themeStyles.text]}>
          Số bài học: {selectedCourse.lessonsCount}
        </Text>
        <Text style={[styles.infoText, themeStyles.text]}>
          Thời lượng: {selectedCourse.duration}
        </Text>
        <Text style={[styles.infoText, themeStyles.text]}>
          Đánh giá: {selectedCourse.rating} ⭐
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedCourse(null)}>
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={[styles.header, themeStyles.text]}>
          Danh sách khóa học
        </Text>
        <View style={styles.switchContainer}>
          <Text style={themeStyles.text}>🌙</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* Greeting */}
      <Text style={[styles.greeting, themeStyles.text]}>
        Chào mừng, {username}!
      </Text>

      {/* Logout button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF3B30', marginBottom: 10 }]}
        onPress={() => {
          setLoggedIn(false);
          setUsername('');
          setSearch('');
          setSelectedCourse(null);
        }}
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Search input */}
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Tìm kiếm khóa học..."
        placeholderTextColor={darkMode ? '#ccc' : '#888'}
        value={search}
        onChangeText={setSearch}
      />

      {/* Tổng số khóa học */}
      <Text style={[styles.countText, themeStyles.text]}>
        Có {filteredCourses.length} khóa học
      </Text>

      {/* Nếu không có kết quả tìm kiếm */}
      {filteredCourses.length === 0 ? (
        <Text style={[styles.noResultsText, themeStyles.text]}>
          Không tìm thấy khóa học nào.
        </Text>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseItem}
              onPress={() => setSelectedCourse(item)}
            >
              <Image source={{ uri: item.image }} style={styles.thumbnail} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.courseTitle, themeStyles.text]}>
                  {item.title}
                </Text>
                <Text style={[styles.courseDesc, themeStyles.text]}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const lightTheme = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  text: { color: '#000' },
  input: { backgroundColor: '#f2f2f2', color: '#000' }
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: '#121212' },
  text: { color: '#fff' },
  input: { backgroundColor: '#333', color: '#fff' }
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold' },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 10
  },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  courseItem: {
    flexDirection: 'row',
    padding: 10, marginBottom: 10,
    borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  courseTitle: { fontSize: 18, fontWeight: 'bold' },
  courseDesc: { fontSize: 14 }, // Không cố định màu để theo theme
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  description: { fontSize: 16, marginBottom: 30 },
  button: {
    backgroundColor: '#007AFF', padding: 12, borderRadius: 6,
    alignItems: 'center', width: 140, alignSelf: 'center', marginTop: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  input: {
    borderWidth: 1, borderRadius: 6, padding: 10,
    marginBottom: 10
  },
  countText: {
    marginBottom: 10,
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  greeting: {
    fontSize: 18,
    marginBottom: 10,
  },
});
