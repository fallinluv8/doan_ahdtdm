import { useState, useEffect } from 'react';

const HomePage = () => {
  const [test, setTest] = useState();
  useEffect(() => {
    const fetchTestAPI = async () => {
      try {
        const response = await fetch('http://localhost:5000/home/test', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const test = await response.json();
          setTest(test);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchTestAPI();
  }, []);
  return (
    <div className='lg:my-20 my-10'>
      <div className='flex justify-center lg:text-4xl md:text-3xl text-2xl text-sky-500 lg:my-10 my-4'>
        {/* Page replacement Algorithms */}
        {test ? <span>test</span> : <span>...</span>}
      </div>
      <div className='lg:mx-20 md:mx-10 mx-4 text-lg dark:text-neutral-500 text-black lg:indent-16 indent-6'>
        <p>
          Trong một hệ điều hành sử dụng phân trang để quản lý bộ nhớ, một thuật
          toán thay thế trang là cần thiết để quyết định trang nào cần được thay
          thế khi một trang mới được đưa vào. Thay thế trang trở nên cần thiết
          khi xảy ra lỗi trang và không có khung trang trống nào trong bộ nhớ.
          Tuy nhiên, một lỗi trang khác sẽ xảy ra nếu trang bị thay thế được
          tham chiếu lại. Do đó, điều quan trọng là thay thế một trang không có
          khả năng được tham chiếu trong tương lai gần. Trước khi tiến hành các
          thuật toán thay thế trang thực tế, hãy thảo luận về Phân trang và Bộ
          nhớ ảo.
        </p>
      </div>
      <div className='flex justify-center mx-4 lg:gap-20 gap-4 lg:my-10 my-4'>
        <video
          src='/img/FIFO.mp4'
          autoPlay
          loop
          muted
          className='rounded-lg lg:w-1/3 w-1/2 border border-sky-700 shadow-sm shadow-sky-400 mx-2 my-4'
        ></video>
        <video
          src='/img/OPT.mp4'
          autoPlay
          loop
          muted
          className='rounded-lg lg:w-1/3 w-1/2 border border-sky-700 shadow-sm shadow-sky-400 mx-2 my-4'
        ></video>
      </div>
      <div className='border-t-2 border-neutral-400 lg:w-1/3 md:w-1/2 w-full mx-auto my-4'></div>
      <div className='lg:mx-20 md:mx-10 mx-4 text-lg dark:text-neutral-500 text-black mb-4'>
        <span className='dark:text-neutral-300 text-sky-500'>
          Phân trang là gì ?
        </span>
        <p className='indent-16'>
          Phân trang là một kỹ thuật quản lý bộ nhớ mà các hệ điều hành sử dụng
          để tối ưu hóa việc sử dụng bộ nhớ máy tính. Nó chia bộ nhớ thành các
          trang có kích thước cố định được ánh xạ tới các khung bộ nhớ vật lý,
          giảm phân mảnh và cải thiện hiệu suất hệ thống. Phương pháp này cho
          phép sử dụng bộ nhớ hiệu quả hơn, điều này rất quan trọng đối với các
          hệ điều hành hiện đại và khả năng xử lý đa nhiệm của chúng.
        </p>
      </div>
      <div className='border-t-2 border-neutral-400 lg:w-1/3 md:w-1/2 w-full mx-auto my-4'></div>
      <div className='lg:mx-20 md:mx-10 mx-4 text-lg dark:text-neutral-500 text-black mb-10'>
        <span className='dark:text-neutral-300 text-sky-500'>
          Lỗi trang là gì ?
        </span>
        <p className='lg:indent-16 indent-6'>
          Lỗi trang xảy ra khi một chương trình đang chạy truy cập vào một trang
          bộ nhớ được ánh xạ vào không gian địa chỉ ảo nhưng không được tải vào
          bộ nhớ vật lý. Vì bộ nhớ vật lý thực tế nhỏ hơn nhiều so với bộ nhớ
          ảo, lỗi trang xảy ra. Trong trường hợp lỗi trang, Hệ điều hành có thể
          phải thay thế một trong các trang hiện có bằng trang mới cần thiết.
          Các thuật toán thay thế trang khác nhau đề xuất các cách khác nhau để
          quyết định trang nào cần thay thế. Mục tiêu của tất cả các thuật toán
          là giảm số lượng lỗi trang.
        </p>
      </div>
      <div className='border-t-2 border-neutral-400 lg:w-1/3 md:w-1/2 w-full mx-auto my-4 '></div>
      <div className='lg:mx-20 md:mx-10 mx-4 text-lg dark:text-neutral-500 text-black mb-10'>
        <div className='flex justify-center items-center my-2'>
          <img src='img/virtual_memory.jpg' alt='' />
        </div>
        <span className='dark:text-neutral-300 text-sky-500'>
          Bộ nhớ ảo trong Hệ điều hành là gì?
        </span>
        <p className='lg:ndent-16 indent-6'>
          Bộ nhớ ảo trong hệ điều hành là một kỹ thuật quản lý bộ nhớ tạo ra ảo
          giác về một khối bộ nhớ liên tục lớn cho người dùng. Nó sử dụng cả bộ
          nhớ vật lý (RAM) và lưu trữ đĩa để cung cấp không gian bộ nhớ ảo lớn
          hơn, cho phép hệ thống chạy các ứng dụng lớn hơn và xử lý nhiều quy
          trình cùng lúc. Điều này giúp cải thiện hiệu suất hệ thống và hiệu quả
          đa nhiệm.
        </p>
      </div>
      <div className='border-t-2 border-neutral-400 lg:w-1/3 md:w-1/2 w-full mx-auto my-4'></div>
      <div className='lg:mx-20 md:mx-10 mx-4 text-lg dark:text-neutral-500 text-black lg:mb-10 mb-4 lg:indent-16 indent-6'>
        <div className='flex justify-center items-center my-2'>
          <img src='img/pages_replacement_alth.png' alt='' />
        </div>
        Thuật toán thay thế trang là các kỹ thuật được sử dụng trong hệ điều
        hành để quản lý bộ nhớ hiệu quả khi bộ nhớ ảo đầy. Khi một trang mới cần
        được tải vào bộ nhớ vật lý và không có không gian trống, các thuật toán
        này xác định trang hiện có nào cần thay thế. Nếu không có khung trang
        nào trống, trình quản lý bộ nhớ ảo thực hiện một thao tác thay thế trang
        để thay thế một trong các trang hiện có trong bộ nhớ bằng trang có tham
        chiếu gây ra lỗi trang. Nó được thực hiện như sau: Trình quản lý bộ nhớ
        ảo sử dụng một thuật toán thay thế trang để chọn một trong các trang
        hiện có trong bộ nhớ để thay thế, truy cập vào mục bảng trang của trang
        được chọn để đánh dấu nó là “không có mặt” trong bộ nhớ và khởi tạo một
        thao tác trang ra cho nó nếu bit sửa đổi của mục bảng trang của nó cho
        biết đó là một trang bẩn.
      </div>
    </div>
  );
};

export default HomePage;
