import { useEffect, useState } from "react";

// 1. Update DOM
//     - Blog
// 2. Call Api
// 3. Listen DOM events
//    1. Scroll
//    2. Resize
// 4. Clean Up
//    1. Remove listener / UnSubscribe
//    2. Clear timer

//Dung de update DOM, call api , add event listner / remove event listener

//tao tabs
const tabs = ["posts", "comments", "albums"];

function UseEffectBasic() {
  //Chia làm 3 trường hợp sử dụng như sau

  //1. useEffect(callback )
  // Gọi callback mỗi khi component re-render
  // Gọi callback sau khi component thêm element vào DOM

  //2. useEffect(callback , [])
  // Chỉ gọi callback 1 lần sau khi component mounted , thường dùng cho call api

  //3. useEffect(callback , [dependencies])
  // dependencies : có thể là biến , props , state ,....
  // Callback sẽ được gọi lại mỗi khi dependencies thay đổi ( dùng toán tử ===)

  //=======3 trường hợp đều đúng các case bên dưới
  // 1- Cả trong 3 trường hợp callback luôn được gọi sau khi component Mounted
  // 2- Clean up function luôn được gọi trước khi component bị unmonted
  // 3- Clean up function luôn luôn được gọi trước khi callback được gọi ( trừ lần mounted )
  //    Nghĩa là trước khi gọi lại callback từ lần thứ 2 thì sẽ gọi hàm dọn dẹp của lần 1 trước

  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");

  //de an hay hien button khi scroll thi dung state de quan ly
  const [showGoToTop, setShowToTop] = useState(false);

  //resize event
  const [width, setWidth] = useState(window.innerWidth);

  //countdown
  const [countdown, setCountdown] = useState(180);

  // Chứng minh : Clean up function luôn luôn được gọi trước khi callback được gọi ( trừ lần mounted )
  const [count, setCount] = useState(1);
  const [avatar, setAvatar] = useState();

  // 1 - Update title DOM
  //
  useEffect(() => {
    //Khi component mounted thì sẽ thực thi
    //hoặc khi component được re-render lại
    document.title = title;
    console.log("re-render");
  });

  //vãn có thể viết ở bên ngoài để update DOM nhưng
  //tại sao lại phải đưa vào useEffect ?
  // document.title = title //code này vẫn ok nha
  //Lý do không viết như vậy là nếu viết ở ngoài thì JS sẽ thực thi trước khi render ra UI
  //Nếu chõ nảy mà thực thi lâu thì UI sẽ bị ảnh hưởng , phải ưu tiên cho UI người dùng
  // Hơn nữa useEffect sinh ra là để giải quyết các side effect này mà

  // 2 - CALL API ( vào page https://jsonplaceholder.typicode.com/ )
  // Ví dụ lấy 100 posts : https://jsonplaceholder.typicode.com/posts

  //Gia su viet call api tai day
  // Open tab network thì nhận thấy sẽ call api 2 lần
  // Tại sao lại 2 lần : ly do là đang chạy <React.StrictMode> => dùng để warning những tình huống code xấu
  // Khi chạy ở production thì nó sẽ bỏ qua <React.StrictMode> này .
  // Hoặc chúng ta có thể bỏ đi cũng được , sau khi bỏ đi thì sẽ thấy api chỉ call 1 lần thôi
  // Do chúng ta viết call api này ở lưng chưng như này thì mỗi khi component được render lại thì sẽ call api

  //Nếu thêm phần setPosts(posts); để hiển thị ra UI thì chúng ta sẽ thấy việc call api là loop vô tận
  //Lý do : useEffect đang dùng sẽ được gọi mỗi khi re-render conponent , mà trong hàm fetch chúng ta có hàm
  // setPosts() làm cho state bị thay đổi => update lại compoent => gọi lại xử lý trong useEffect => call api
  // => gọi setPosts => ....

  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((posts) => {
  //       setPosts(posts);
  //       console.log(posts);
  //     });

  // Thử đưa vào useEffect thì sao ? có giải quyết các kadai trên không ?
  // Nó vẫn bị call api nhiều lẩn
  // Bởi vì sử dụng useEffect mà không có tham số thứ 2 thì nó vẫn gọi mỗi khi component re-render lại
  // Vậy phải làm sao ?? ==> cách dùng useEffect thứ 2

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => res.json())
  //       .then((posts) => {
  //         console.log(posts);
  //       });
  //   });

  //   //2. useEffect có tham số thứ  là []

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => res.json())
  //       .then((posts) => {
  //         setPosts(posts);
  //         console.log(posts);
  //       });
  //   }, []);

  //3. useEffect có tham số thứ  là [deps]
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        console.log(posts);
      });
  }, [type]);

  //3.Listen DOM event
  // scroll event
  // Do event thì chỉ cần kích hoạt 1 lần thôi nên sẽ dùng useEffect với tham số thứ 2 là []
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        //show button
        // Để show hay hide thi cần render lại giao diện người dùng => dùng useState
        setShowToTop(true);
        //setShowToTop sẽ luôn được call nhưng component sẽ không re-render lại
        // lý do : nó so sánh với state của nó === , nếu không thay đổi thì không render lại
      } else {
        setShowToTop(false);
        //hide button
      }

      //setShowToTop(window.scrollY >=200)
    };
    //vấn đề phát sinh là gì ?
    // chúng ta đang add event ở phạm vi window, các component của reactjs thì
    // có thể sẽ được mounted hoặc unmounted bởi thao tác của người dùng
    // ví dụ : nhấn button toggle thì sẽ mounted component ( khi này thì sẽ addevent)
    // khi nhấn tiếp toggle thì component sẽ unmounted , tuy nhiên event đã add vào window
    // thì không bị mất đi khi unmonted component . Nó chỉ mât đi khi close tab của trình
    // duyệt hoặc là đóng luôn trình duyệt
    // do vậy sẽ bị rò rỉ bộ nhớ , event đã add vào trước đó sẽ thành rác và làm hiệu suất
    // của app sẽ giảm đi.
    // Mỗi khi component chạy lệnh bên dưới thì add vào listener mới
    //Nếu mở dev tool lên thì chúng ta sẽ thấy warning : can't perform a react state update on an unmounted component....
    // Nghĩa là component đã unmounted rồi nhưng event vẫn còn trong bộ nhớ , nó vẫn lằng
    //nghe sự kiện scoll page và thực thi handleScroll

    window.addEventListener("scroll", handleScroll);

    //Clean up function start : return hàm callback dễ làm các việc mà chúng ta muốn trước khi component bị unmounted
    return () => {
      console.log("unmounting....");
      window.removeEventListener("scroll", handleScroll);
    };
    //Clean up function end
  }, []);

  //resize event
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    //add event
    window.addEventListener("resize", handleResize);

    //clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //   // Đồng hồ đếm ngược
  //   // Không dùng useEffect
  //   // setInterval thì chỉ set 1 lần , muốn huỷ thì phải tắt PG hoặc lả ClearInterval
  //   setInterval(() => {
  //     // vấn đề phát sinh là gì
  //     // mơ1i đầu thì chạy ok nhưng chạy mốt lúc sẽ thấy số bị nhấp nháy
  //     // lý do :  khi chạy thì cứ mỗi 1 giây thì gọi setTinterval này => gọi setCountdown => làm
  //     // thay đổi state => render lại component
  //     // càng về sau thì có nhiều interval chạy song song nhau và lệch nhau một chút nên tạo hiện
  //     // tương số bị nhấp nháy

  //     setCountdown(countdown - 1);

  //   }, 1000);

  //làm sao sửa ,
  // lựa chọn useEffect nào để làm , chính là cách 2 ( render 1 lần thôi)
  // Vấn đề phát sinh là chạy tối 179 thì dừng lại
  // Why ?
  //
  useEffect(() => {
    const timerId = setInterval(() => {
      //   setCountdown(countdown - 1);
      console.log("Countdown: ", countdown); // luôn in ra là 180
      // liên quan đến khái niệm Closure trong js
      // Hàm callback của useEffect thì chỉ chạy 1 lần sau khi component được mounted
      // lúc đó hàm setInterval thi biến countdown đang tham chiếu tới giá trị trong hàm
      // setInterval , lúc đó tham chiếu tới giá trị ban đầu ở bên ngoài là 180
      // do vậy cho dù chạy bao nhiêu lần thì cũng như nhau
      // chỉnh sửa như thế nào ?
      // 1- dùng callback trong hàm setCountdown
      // lúc này ko còn biến nào tham chiếu tới giá trị countdown bên ngoài nữa
      setCountdown((prevState) => prevState - 1);
    }, 1000);

    //vấn đế phát sinh cũng giống như event listener
    // khi unmounted compoenent thì hàm số setInterval vẫn còn chạy
    // phải dọn dẹp trước khi unmounted

    // Clean up func

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Ngoài ra có thể dùng setTimeout , tuy nhiên setTimeout thì chỉ chạy 1 lần thôi
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      // mỗi lần countdown đươc set thi sẽ re-render lại component
      // giá trị countdown sẽ bị trừ đi 1
      // lấy giá trị náy đưa vào dependencies
      // do dependencies  thay đổi nên sẽ gọi lại callback của useEffect
      // gọi tiếp setTimeout
      // sẽ đạt được count down như mong muốn
      setCountdown(countdown - 1);
      console.log("Countdown: ", countdown);
    }, 1000);

    //Clean up func
    return () => {
      clearTimeout(myTimeout);
    };
  }, [countdown]);

  // Chứng minh : Clean up function luôn luôn được gọi trước khi callback được gọi ( trừ lần mounted )
  useEffect(() => {
    console.log(`Mounted or re-render lần ${count}`);

    //Clean up

    return () => {
      console.log(`Clean up lần ${count}`);
    };
  }, [count]);

  //Ứng dụng ảnh avatar
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    console.log(file);
    //chúng ta có thể dùng URL.createObjectURL(file) để sinh ra 1 blob url tạm thời ( lưu vào bộ nhớ)
    console.log(URL.createObjectURL(file));

    //file là 1 object nên ta có thể thêm 1 thuộc tính vào
    file.preview = URL.createObjectURL(file);

    //set vào avatar
    // sau khi set state thì component sẽ re-render lại
    // và avatar sẽ là object vừa set và sẽ có property là preview
    // lúc này dùng preview này để show img
    setAvatar(file);
  };

  //=== return DOM
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setType(tab)}
          style={
            type === tab
              ? {
                  color: "#fff",
                  backgroundColor: "orange",
                }
              : {}
          }
        >
          {tab}
        </button>
      ))}

      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <ul>
        {posts.map((post) => (
          <li key={post.id}> {post.title || post.name}</li>
        ))}
      </ul>
      {/* Scroll event */}
      {showGoToTop && (
        <button
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
        >
          Go To Top
        </button>
      )}

      {/* Resize event */}
      <h2>{width}</h2>

      {/* Tạo ứng dụng đếm ngược theo giây -- vận dụng settimeout và interval với useEffect*/}
      <h2>{countdown}</h2>

      {/* // Chứng minh : Clean up function luôn luôn được gọi trước khi callback được gọi ( trừ lần mounted ) */}
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      {/* Avater */}

      <input type="file" onChange={handlePreviewAvatar} />
      {avatar && <img src="avatar.preview" alt="" width="80%" />}

      {console.log("render")}
    </div>
  );
}

export default UseEffectBasic;
