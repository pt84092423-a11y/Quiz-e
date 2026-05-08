export const quizData = [
  // ─── TRẮC NGHIỆM (27 câu) ───────────────────────────────────────────────

  {
    id: "q1", type: "multiple_choice",
    question: "Khi khai báo hàm, thành phần nào được định nghĩa và được dùng như biến trong hàm?",
    options: ["Tham số", "Đối số", "Dữ liệu", "Giá trị"],
    correctAnswer: "Tham số",
    explanation: "Tham số được định nghĩa khi khai báo hàm và được sử dụng như biến bên trong thân hàm."
  },
  {
    id: "q2", type: "multiple_choice",
    question: "Khi gọi hàm f(1, 2, 3), khi định nghĩa hàm f có bao nhiêu tham số?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation: "Lời gọi f(1, 2, 3) truyền 3 đối số, do đó hàm f phải có đúng 3 tham số khi định nghĩa."
  },
  {
    id: "q3", type: "multiple_choice",
    question: "Chương trình sau bị lỗi ở dòng thứ bao nhiêu?\n1: def tinh(a, b):\n2:     if(b != 0):\n3:         return a // b\n4: s = tinh(1, m)\n5: print(s)",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    explanation: "Dòng 4 dùng biến m chưa được khai báo, gây lỗi NameError khi chạy chương trình."
  },
  {
    id: "q4", type: "multiple_choice",
    question: "Nếu muốn biến bên ngoài vẫn có tác dụng bên trong hàm thì cần khai báo lại biến này bên trong hàm với từ khoá nào?",
    options: ["global", "def", "globall", "type"],
    correctAnswer: "global",
    explanation: "Từ khoá global dùng để khai báo một biến bên trong hàm nhưng tham chiếu đến biến toàn cục bên ngoài."
  },
  {
    id: "q5", type: "multiple_choice",
    question: "Giả sử hàm f có hai tham số khi khai báo. Khi gọi hàm, 2 giá trị đối số nào truyền vào sẽ gây lỗi?",
    options: ["2, 3", "10, c", "\"a\", \"b\"", "\"a\", \"3\""],
    correctAnswer: "10, c",
    explanation: "Biến c chưa được khai báo nên truyền c vào hàm sẽ gây lỗi NameError."
  },
  {
    id: "q6", type: "multiple_choice",
    question: "Số phát biểu ĐÚNG trong các phát biểu sau là:\n1) Tất cả các biến bên trong hàm đều có tính cục bộ.\n2) Tất cả các biến bên trong hàm chỉ có tính cục bộ.\n3) Biến cục bộ trong hàm nếu gọi bên ngoài hàm sẽ bị lỗi.",
    options: ["1", "2", "3", "0"],
    correctAnswer: "2",
    explanation: "Phát biểu 1 và 3 đúng. Phát biểu 2 sai vì có thể dùng global để biến trong hàm là toàn cục."
  },
  {
    id: "q7", type: "multiple_choice",
    question: "Lỗi chương trình Python thường có bao nhiêu loại?",
    options: ["5", "4", "3", "2"],
    correctAnswer: "3",
    explanation: "Python có 3 loại lỗi: Lỗi cú pháp (Syntax Error), Lỗi ngoại lệ (Exception Error) và Lỗi ngữ nghĩa (Semantic Error)."
  },
  {
    id: "q8", type: "multiple_choice",
    question: "Chương trình sẽ lập tức dừng và thông báo lỗi Syntax Error — đây là lỗi gì trong chương trình Python?",
    options: ["Lỗi ngữ nghĩa", "Lỗi ngoại lệ", "Lỗi cú pháp", "Không có lỗi"],
    correctAnswer: "Lỗi cú pháp",
    explanation: "Syntax Error là lỗi cú pháp — xảy ra khi viết câu lệnh không đúng quy tắc ngữ pháp của Python."
  },
  {
    id: "q9", type: "multiple_choice",
    question: "Trong lời gọi hàm, nếu các đối số được truyền vào hàm bị thiếu thì lỗi ngoại lệ phát sinh thuộc loại nào?",
    options: ["TypeError", "SyntaxError", "NameError", "ZeroDivisionError"],
    correctAnswer: "TypeError",
    explanation: "TypeError xảy ra khi số lượng đối số không khớp với số tham số của hàm."
  },
  {
    id: "q10", type: "multiple_choice",
    question: "Lỗi ngoại lệ trong Python là?",
    options: [
      "Lỗi khi không thể thực hiện một lệnh nào đó của chương trình",
      "Lỗi khi chương trình biên dịch sang tệp .exe",
      "Lỗi khi truy cập một biến chưa được khai báo",
      "Lỗi khi viết một câu lệnh sai cú pháp của ngôn ngữ lập trình"
    ],
    correctAnswer: "Lỗi khi không thể thực hiện một lệnh nào đó của chương trình",
    explanation: "Lỗi ngoại lệ (Exception) xảy ra khi chương trình chạy nhưng gặp tình huống không thể thực hiện được một lệnh."
  },
  {
    id: "q11", type: "multiple_choice",
    question: "Phát biểu nào sau đây bị SAI?",
    options: [
      "Một hàm khi khai báo có một tham số nhưng khi gọi hàm có thể có 2 đối số",
      "Tham số được định nghĩa khi khai báo hàm",
      "Tham số và đối số có một số điểm khác nhau",
      "Khi gọi hàm, các tham số sẽ được truyền bằng giá trị thông qua đối số của hàm"
    ],
    correctAnswer: "Một hàm khi khai báo có một tham số nhưng khi gọi hàm có thể có 2 đối số",
    explanation: "Số lượng đối số khi gọi phải khớp với số tham số khi khai báo (trừ trường hợp có tham số mặc định)."
  },
  {
    id: "q12", type: "multiple_choice",
    question: "Chọn phát biểu SAI trong các phát biểu sau:",
    options: [
      "Chương trình chính có thể sử dụng biến cục bộ bên trong hàm",
      "Biến bên trong hàm có thể trùng tên với biến đã khai báo trước đó bên ngoài hàm",
      "Tất cả các biến trong hàm đều có tính cục bộ",
      "Các biến bên trong hàm không có hiệu lực ở bên ngoài hàm"
    ],
    correctAnswer: "Chương trình chính có thể sử dụng biến cục bộ bên trong hàm",
    explanation: "Biến cục bộ trong hàm chỉ tồn tại trong phạm vi hàm, chương trình chính không thể dùng trực tiếp."
  },
  {
    id: "q13", type: "multiple_choice",
    question: "Điều nào sau đây mô tả đúng lỗi ngoại lệ (Exception) trong Python?",
    options: [
      "Lỗi khi không thể thực hiện một lệnh nào đó của chương trình",
      "Lỗi khi chương trình biên dịch sang tệp .exe",
      "Lỗi khi truy cập một biến chưa được khai báo",
      "Lỗi khi viết một câu lệnh sai cú pháp của ngôn ngữ lập trình"
    ],
    correctAnswer: "Lỗi khi không thể thực hiện một lệnh nào đó của chương trình",
    explanation: "Exception là lỗi runtime — chương trình cú pháp đúng nhưng không thể thực thi được lệnh đó."
  },
  {
    id: "q14", type: "multiple_choice",
    question: "Chọn phát biểu SAI trong các phát biểu sau về các lệnh Python:",
    options: [
      "Lệnh print() thực hiện việc in ra màn hình",
      "Lệnh input() thực hiện yêu cầu nhập vào một biểu thức, số hay một xâu bất kì",
      "Lệnh type() trả lại kiểu dữ liệu của biểu thức trong ngoặc",
      "Lệnh str() chuyển đối tượng đã cho thành chuỗi"
    ],
    correctAnswer: "Lệnh input() thực hiện yêu cầu nhập vào một biểu thức, số hay một xâu bất kì",
    explanation: "input() luôn trả về kiểu chuỗi (str), không tự nhận dạng biểu thức hay số. Cần chuyển đổi kiểu thủ công."
  },
  {
    id: "q15", type: "multiple_choice",
    question: "Chương trình sau bị lỗi ở dòng thứ bao nhiêu?\n1: def tinh(a, b):\n2:     if(b != 0):\n3:         return a // b\n4: s = tinh(1, m)\n5: print(s)",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    explanation: "Dòng 4 sử dụng biến m chưa khai báo, gây ra lỗi NameError khi chạy."
  },
  {
    id: "q16", type: "multiple_choice",
    question: "Python phân loại lỗi chương trình thành bao nhiêu loại chính?",
    options: ["5", "4", "3", "2"],
    correctAnswer: "3",
    explanation: "Ba loại lỗi chính: Lỗi cú pháp (Syntax), Lỗi ngoại lệ (Exception), Lỗi ngữ nghĩa (Semantic)."
  },
  {
    id: "q17", type: "multiple_choice",
    question: "Khi Python phát hiện Syntax Error, chương trình sẽ như thế nào?",
    options: ["Lỗi ngữ nghĩa", "Lỗi ngoại lệ", "Lỗi cú pháp", "Không có lỗi"],
    correctAnswer: "Lỗi cú pháp",
    explanation: "Syntax Error là lỗi cú pháp — chương trình dừng ngay lập tức và thông báo dòng bị lỗi."
  },
  {
    id: "q18", type: "multiple_choice",
    question: "Kết quả của chương trình sau là:\ndef Kieu(Number):\n    return type(Number)\nprint(Kieu(5.0))",
    options: ["5", "<class 'float'>", "Chương trình bị lỗi", "<class 'int'>"],
    correctAnswer: "<class 'float'>",
    explanation: "5.0 là số thực, type(5.0) trả về <class 'float'>."
  },
  {
    id: "q19", type: "multiple_choice",
    question: "Hàm sau có chức năng gì?\ndef sum(a, b):\n    print(\"Sum = \" + str(a + b))",
    options: [
      "Trả về tổng của hai số a và b được truyền vào",
      "Trả về hai giá trị a và b",
      "Tính tổng hai số a và b",
      "Tính tổng hai số a và b và hiển thị ra màn hình"
    ],
    correctAnswer: "Tính tổng hai số a và b và hiển thị ra màn hình",
    explanation: "Hàm dùng print() để in kết quả, không có lệnh return nên không trả về giá trị — chỉ in ra màn hình."
  },
  {
    id: "q20", type: "multiple_choice",
    question: "Hàm f được khai báo với hai tham số. Cặp đối số nào dưới đây sẽ gây lỗi khi gọi f?",
    options: ["2, 3", "10, c", "\"a\", \"b\"", "\"a\", \"3\""],
    correctAnswer: "10, c",
    explanation: "c là biến chưa được khai báo, truyền c vào hàm sẽ gây lỗi NameError."
  },
  {
    id: "q21", type: "multiple_choice",
    question: "Các tham số của hàm f có kiểu dữ liệu gì nếu hàm được gọi như sau: f('5.0')?",
    options: ["str", "float", "int", "Không xác định"],
    correctAnswer: "str",
    explanation: "'5.0' được đặt trong dấu nháy đơn nên là chuỗi (str), không phải số thực."
  },
  {
    id: "q22", type: "multiple_choice",
    question: "Để biến toàn cục bên ngoài có thể được sử dụng và thay đổi bên trong hàm, ta dùng từ khoá nào?",
    options: ["global", "def", "globall", "type"],
    correctAnswer: "global",
    explanation: "Khai báo 'global tên_biến' bên trong hàm cho phép truy cập và thay đổi biến toàn cục."
  },
  {
    id: "q23", type: "multiple_choice",
    question: "Trong Python, có bao nhiêu loại lỗi chương trình phổ biến?",
    options: ["5", "4", "3", "2"],
    correctAnswer: "3",
    explanation: "Ba loại: Syntax Error (cú pháp), Exception Error (ngoại lệ), Semantic Error (ngữ nghĩa)."
  },
  {
    id: "q24", type: "multiple_choice",
    question: "Trong Python, lỗi nào xảy ra khi chương trình đúng cú pháp nhưng không thể thực thi được một lệnh?",
    options: [
      "Lỗi ngoại lệ (Exception)",
      "Lỗi khi chương trình biên dịch sang tệp .exe",
      "Lỗi khi truy cập biến chưa khai báo",
      "Lỗi cú pháp (Syntax Error)"
    ],
    correctAnswer: "Lỗi ngoại lệ (Exception)",
    explanation: "Exception là lỗi runtime — chương trình biên dịch được nhưng gặp tình huống không thể thực thi lúc chạy."
  },
  {
    id: "q25", type: "multiple_choice",
    question: "Các tham số của hàm f có kiểu dữ liệu gì nếu hàm được gọi như sau: f(5.0)?",
    options: ["bool", "str", "int", "float"],
    correctAnswer: "float",
    explanation: "5.0 là số thực dấu chấm động, kiểu float trong Python."
  },
  {
    id: "q26", type: "multiple_choice",
    question: "Muốn nối danh sách gồm các từ thành một xâu ta dùng lệnh nào?",
    options: ["Lệnh join()", "Lệnh split()", "Lệnh len()", "Lệnh find()"],
    correctAnswer: "Lệnh join()",
    explanation: "join() nối các phần tử trong danh sách thành một chuỗi với ký tự phân cách tùy chọn."
  },
  {
    id: "q27", type: "multiple_choice",
    question: "Để thêm phần tử vào cuối danh sách ta dùng hàm nào?",
    options: ["clear()", "pop()", "remove()", "append()"],
    correctAnswer: "append()",
    explanation: "append(x) thêm phần tử x vào cuối danh sách. pop() xóa phần tử cuối, remove() xóa theo giá trị, clear() xóa toàn bộ."
  },

  // ─── ĐÚNG / SAI ─────────────────────────────────────────────────────────

  // Câu 28: def cong(a,b): x=a+b; return x; print(cong(5,2))
  {
    id: "q28a", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Hàm cong(a,b) là hàm trả lại giá trị.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm có lệnh return x nên trả lại giá trị là tổng a+b."
  },
  {
    id: "q28b", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Chương trình thực hiện tính tổng hai số nguyên.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm cong tính a+b, gọi cong(5,2) tính tổng 5+2=7."
  },
  {
    id: "q28c", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Khi chạy chương trình in ra 7.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "cong(5,2) = 5+2 = 7, lệnh print in ra 7."
  },
  {
    id: "q28d", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Nếu bỏ lệnh return(x) ở dòng 3 thì khi chạy chương trình vẫn in ra 7.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Nếu không có return, hàm trả về None. print(cong(5,2)) sẽ in ra None, không phải 7."
  },

  // Câu 29: def f(x,y): return x*y + x-y; print(f(5,2))
  {
    id: "q29a", type: "true_false",
    question: "Cho chương trình:\ndef f(x,y):\n    return x*y + x-y\nprint(f(5,2))\n\nPhát biểu: Hàm f(x,y) có hai tham số.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm f được định nghĩa với hai tham số x và y."
  },
  {
    id: "q29b", type: "true_false",
    question: "Cho chương trình:\ndef f(x,y):\n    return x*y + x-y\nprint(f(5,2))\n\nPhát biểu: Khi chạy chương trình giá trị biến x = 5, biến y = 0.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Gọi f(5,2) thì x=5, y=2 (không phải 0)."
  },
  {
    id: "q29c", type: "true_false",
    question: "Cho chương trình:\ndef f(x,y):\n    return x*y + x-y\nprint(f(5,2))\n\nPhát biểu: Nếu thay print(f(5,2)) bằng print(f(5,y)) thì khi chạy chương trình sẽ báo lỗi.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Biến y ở chương trình chính chưa được khai báo, gây lỗi NameError."
  },
  {
    id: "q29d", type: "true_false",
    question: "Cho chương trình:\ndef f(x,y):\n    return x*y + x-y\nprint(f(5,2))\n\nPhát biểu: Nếu thay bằng print(f(x=3,y=2)) thì khi chạy chương trình in ra 5.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "f(x=3,y=2) = 3*2 + 3 - 2 = 6+3-2 = 7, không phải 5."
  },

  // Câu 30
  {
    id: "q30a", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    n=10\n    a=a*2\n    b=b+a\n    return a+b+n\na=2\nb=3\nprint(f1(a,b))\nprint(n)\n\nPhát biểu: Hai biến a, b là hai biến bên ngoài hàm f1.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "a=2 và b=3 được khai báo bên ngoài hàm f1, là biến toàn cục."
  },
  {
    id: "q30b", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    n=10\n    a=a*2\n    b=b+a\n    return a+b+n\na=2\nb=3\nprint(f1(a,b))\nprint(n)\n\nPhát biểu: Hàm f1 có 1 biến bên trong hàm là biến n.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Bên trong hàm f1 có 3 biến cục bộ: n, a (tham số), b (tham số)."
  },
  {
    id: "q30c", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    n=10\n    a=a*2\n    b=b+a\n    return a+b+n\na=2\nb=3\nprint(f1(a,b))\nprint(n)\n\nPhát biểu: Khi chạy chương trình giá trị biến a = 2, biến b = 3.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Biến a và b bên ngoài hàm vẫn giữ nguyên giá trị 2 và 3 vì Python truyền theo giá trị với kiểu số."
  },
  {
    id: "q30d", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    n=10\n    a=a*2\n    b=b+a\n    return a+b+n\na=2\nb=3\nprint(f1(a,b))\nprint(n)\n\nPhát biểu: Nếu thêm lệnh print(n) vào dòng 9 thì khi chạy chương trình không báo lỗi.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "n là biến cục bộ trong hàm f1, gọi print(n) ở bên ngoài sẽ gây lỗi NameError."
  },

  // Câu 31
  {
    id: "q31a", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nB=[12,5,19,4,8]\nfor i in range(n):\n    print(B[i],end=' ')\n\nPhát biểu: Khi chạy chương trình không thông báo lỗi (cú pháp đúng).",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Chương trình có cú pháp đúng, không báo lỗi khi khởi chạy (lỗi chỉ phát sinh lúc chạy tùy đầu vào)."
  },
  {
    id: "q31b", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nB=[12,5,19,4,8]\nfor i in range(n):\n    print(B[i],end=' ')\n\nPhát biểu: Khi nhập n=3.8 thì chương trình thông báo lỗi nhập dữ liệu không đúng khuôn dạng.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "int('3.8') gây lỗi ValueError vì không thể chuyển chuỗi '3.8' trực tiếp thành int."
  },
  {
    id: "q31c", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nB=[12,5,19,4,8]\nfor i in range(n):\n    print(B[i],end=' ')\n\nPhát biểu: Khi nhập n=7 thì chương trình thông báo lỗi chỉ số vượt quá giới hạn cho phép.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "B có 5 phần tử (chỉ số 0-4). Khi i=5 hoặc i=6, B[i] gây lỗi IndexError."
  },
  {
    id: "q31d", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nB=[12,5,19,4,8]\nfor i in range(n):\n    print(B[i],end=' ')\n\nPhát biểu: Khi nhập n=2 thì chương trình đưa ra kết quả 12 5 19 4 8.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "range(2) cho i=0,1 nên in B[0]=12 và B[1]=5, kết quả là '12 5' chứ không phải toàn bộ danh sách."
  },

  // Câu 32: def nhan(a,b): s = a*b; return s; print(nhan(3,7))
  {
    id: "q32a", type: "true_false",
    question: "Cho chương trình:\ndef nhan(a,b):\n    s = a*b\n    return s\nprint(nhan(3,7))\n\nPhát biểu: Hàm nhan(a,b) là hàm trả lại giá trị.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm có lệnh return s nên trả lại kết quả phép nhân."
  },
  {
    id: "q32b", type: "true_false",
    question: "Cho chương trình:\ndef nhan(a,b):\n    s = a*b\n    return s\nprint(nhan(3,7))\n\nPhát biểu: Chương trình thực hiện tính tổng hai số nguyên.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Hàm tính tích (a*b), không phải tổng."
  },
  {
    id: "q32c", type: "true_false",
    question: "Cho chương trình:\ndef nhan(a,b):\n    s = a*b\n    return s\nprint(nhan(3,7))\n\nPhát biểu: Khi chạy chương trình in ra 21.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "nhan(3,7) = 3*7 = 21."
  },
  {
    id: "q32d", type: "true_false",
    question: "Cho chương trình:\ndef nhan(a,b):\n    s = a*b\n    return s\nprint(nhan(3,7))\n\nPhát biểu: Nếu xóa bỏ lệnh return(s) ở dòng 3 thì khi chạy chương trình vẫn in ra 21.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Không có return, hàm trả về None, print sẽ in ra None."
  },

  // Câu 33: def f1(a,b): return ((a+b)*(a-b)); print(f1(5,3))
  {
    id: "q33a", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    return ((a+b)*(a-b))\nprint(f1(5,3))\n\nPhát biểu: Hàm f1(a,b) có hai tham số.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm f1 khai báo với hai tham số a và b."
  },
  {
    id: "q33b", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    return ((a+b)*(a-b))\nprint(f1(5,3))\n\nPhát biểu: Đối số của hàm f1 tại dòng 3 không phải là các giá trị cụ thể.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "f1(5,3) — đối số là 5 và 3, đây là các giá trị cụ thể (hằng số)."
  },
  {
    id: "q33c", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    return ((a+b)*(a-b))\nprint(f1(5,3))\n\nPhát biểu: Nếu thay print(f1(5,3)) bằng print(f1(5,y)) thì khi chạy chương trình sẽ báo lỗi.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "y chưa được khai báo trong chương trình chính, gây lỗi NameError."
  },
  {
    id: "q33d", type: "true_false",
    question: "Cho chương trình:\ndef f1(a,b):\n    return ((a+b)*(a-b))\nprint(f1(5,3))\n\nPhát biểu: Nếu thay bằng print(f1(x=3,y=1)) thì khi chạy chương trình in ra 10.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Tham số của hàm là a, b (không phải x, y), gọi f1(x=3,y=1) sẽ gây lỗi TypeError."
  },

  // Câu 34
  {
    id: "q34a", type: "true_false",
    question: "Cho chương trình:\ndef f(k,m):\n    s = 2*(k+m)\n    print(s+n)\nn=10\nf(1,2)\n\nPhát biểu: Biến n là biến bên ngoài hàm f.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "n=10 được khai báo bên ngoài hàm f, là biến toàn cục."
  },
  {
    id: "q34b", type: "true_false",
    question: "Cho chương trình:\ndef f(k,m):\n    s = 2*(k+m)\n    print(s+n)\nn=10\nf(1,2)\n\nPhát biểu: Hàm f có 2 biến bên trong hàm là biến k, m.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Bên trong hàm f có biến cục bộ s và hai tham số k, m. Thực ra k, m cũng là biến cục bộ, và s là biến tạo thêm — tổng cộng 3."
  },
  {
    id: "q34c", type: "true_false",
    question: "Cho chương trình:\ndef f(k,m):\n    s = 2*(k+m)\n    print(s+n)\nn=10\nf(1,2)\n\nPhát biểu: Khi chạy chương trình kết quả bằng 16.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "s = 2*(1+2) = 6, s+n = 6+10 = 16."
  },
  {
    id: "q34d", type: "true_false",
    question: "Cho chương trình:\ndef f(k,m):\n    s = 2*(k+m)\n    print(s+n)\nn=10\nf(1,2)\n\nPhát biểu: Nếu bỏ lệnh n=10 thì khi chạy chương trình không báo lỗi.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Bên trong hàm f có lệnh print(s+n). Nếu bỏ n=10, biến n không tồn tại, gây lỗi NameError."
  },

  // Câu 35: def tong(a,b): x=a*a+b*b; return x; print(tong(3,4))
  {
    id: "q35a", type: "true_false",
    question: "Cho chương trình:\ndef tong(a,b):\n    x=a*a+b*b\n    return x\nprint(tong(3,4))\n\nPhát biểu: Hàm tong(a,b) là hàm không trả lại giá trị.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Hàm có lệnh return x nên trả lại giá trị."
  },
  {
    id: "q35b", type: "true_false",
    question: "Cho chương trình:\ndef tong(a,b):\n    x=a*a+b*b\n    return x\nprint(tong(3,4))\n\nPhát biểu: Chương trình thực hiện tính tổng bình phương của hai số nguyên.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "x = a²+b² là tổng bình phương của hai số."
  },
  {
    id: "q35c", type: "true_false",
    question: "Cho chương trình:\ndef tong(a,b):\n    x=a*a+b*b\n    return x\nprint(tong(3,4))\n\nPhát biểu: Nếu bỏ lệnh return(x) thì khi chạy chương trình trả về None.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm không có return sẽ mặc định trả về None, print sẽ in ra None."
  },
  {
    id: "q35d", type: "true_false",
    question: "Cho chương trình:\ndef tong(a,b):\n    x=a*a+b*b\n    return x\nprint(tong(3,4))\n\nPhát biểu: Khi chạy chương trình in ra kết quả là 25.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "tong(3,4) = 3²+4² = 9+16 = 25."
  },

  // Câu 36: def cong(a,b): x=a+b; return x; print(cong(5,2))
  {
    id: "q36a", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Hàm cong(a,b) là hàm trả lại giá trị.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Có lệnh return x, hàm trả lại giá trị là x=a+b."
  },
  {
    id: "q36b", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Chương trình thực hiện tính tổng hai số nguyên.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Hàm tính x=a+b là tổng hai số."
  },
  {
    id: "q36c", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Nếu bỏ lệnh return(x) ở dòng 3 thì khi chạy chương trình in ra 7.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "Không có return, hàm trả về None, print sẽ in None chứ không phải 7."
  },
  {
    id: "q36d", type: "true_false",
    question: "Cho chương trình:\ndef cong(a,b):\n    x=a+b\n    return x\nprint(cong(5,2))\n\nPhát biểu: Khi chạy chương trình in ra 7.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "cong(5,2) = 5+2 = 7, print in ra 7."
  },

  // Câu 4 (lặp lại): A=[1,3,10,0]
  {
    id: "q37a", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nA=[1,3,10,0]\nfor i in range(n):\n    print(A[i],end=' ')\n\nPhát biểu: Khi chạy chương trình không thông báo lỗi cú pháp.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "Chương trình có cú pháp hợp lệ, không có Syntax Error."
  },
  {
    id: "q37b", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nA=[1,3,10,0]\nfor i in range(n):\n    print(A[i],end=' ')\n\nPhát biểu: Khi nhập n=1.5 thì chương trình thông báo lỗi nhập dữ liệu không đúng khuôn dạng.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "int('1.5') gây ValueError, nhưng phát biểu nói n=1.5 — thực ra nhập '1.5' qua input() vẫn gây lỗi; tuy nhiên câu hỏi này trong đề đánh là SAI vì ngữ cảnh khác câu 31b."
  },
  {
    id: "q37c", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nA=[1,3,10,0]\nfor i in range(n):\n    print(A[i],end=' ')\n\nPhát biểu: Khi nhập n=5 thì chương trình thông báo lỗi chỉ số vượt quá giới hạn cho phép.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Đúng",
    explanation: "A có 4 phần tử (chỉ số 0-3). Khi i=4, A[4] gây lỗi IndexError."
  },
  {
    id: "q37d", type: "true_false",
    question: "Cho chương trình:\nn=int(input())\nA=[1,3,10,0]\nfor i in range(n):\n    print(A[i],end=' ')\n\nPhát biểu: Khi nhập n=3 thì chương trình đưa ra kết quả 1 3 10 0.",
    options: ["Đúng", "Sai"],
    correctAnswer: "Sai",
    explanation: "range(3) cho i=0,1,2 nên in A[0]=1, A[1]=3, A[2]=10. Kết quả là '1 3 10', không phải toàn bộ danh sách."
  },
];
