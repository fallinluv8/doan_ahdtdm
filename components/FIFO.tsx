import { useState } from 'react';

const FIFO = () => {
  const [referenceString, setReferenceString] = useState<string>('');
  const [pageFrames, setPageFrames] = useState<number>(3);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [frames, setFrames] = useState<number[][]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [pageFaults, setPageFaults] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // Thêm state cho trạng thái hoàn thành

  const initializeFIFO = () => {
    if (!referenceString.trim()) {
      alert('Vui lòng nhập chuỗi tham chiếu.');
      return;
    }

    const referenceArray = referenceString.split(',').map(Number);
    if (referenceArray.some(isNaN)) {
      alert(
        'Chuỗi tham chiếu không hợp lệ. Vui lòng chỉ nhập các số nguyên cách nhau bằng dấu phẩy.'
      );
      return;
    }

    let tempFrames: number[][] = [];
    let memoryFrames: number[] = Array(pageFrames).fill(-1);
    let fifoQueue: number[] = [];
    let faults = 0;

    for (let i = 0; i < referenceArray.length; i++) {
      const currentPage = referenceArray[i];

      if (!memoryFrames.includes(currentPage)) {
        faults++;

        if (fifoQueue.length < pageFrames) {
          fifoQueue.push(currentPage);
          memoryFrames[fifoQueue.length - 1] = currentPage;
        } else {
          const oldPage = fifoQueue.shift();
          if (oldPage !== undefined) {
            const indexToReplace = memoryFrames.indexOf(oldPage);
            if (indexToReplace !== -1) {
              memoryFrames[indexToReplace] = currentPage;
            }
          }
          fifoQueue.push(currentPage);
        }
      }
      tempFrames.push([...memoryFrames]);
    }

    setFrames(tempFrames);
    setPageFaults(faults);
    setCurrentStep(1);
    setIsCompleted(false); // Đặt trạng thái hoàn thành là false
    setExplanation('Trang đầu tiên đã được thêm vào.');
  };

  const nextStep = () => {
    if (currentStep < frames.length) {
      setCurrentStep(currentStep + 1);
      setExplanation(
        `Trang ${referenceString.split(',')[currentStep]} đã được thêm vào.`
      );
    } else {
      setIsCompleted(true); // Đặt trạng thái hoàn thành là true
      setExplanation('Đã hoàn thành tất cả các bước.');
    }
  };

  const resetSimulation = () => {
    setReferenceString('');
    setPageFrames(3);
    setFrames([]);
    setCurrentStep(0);
    setExplanation('');
    setPageFaults(0);
    //setIsCompleted(false); // Reset trạng thái hoàn thành
  };

  return (
    <div className='flex flex-col justify-center md:items-center items-start mx-4 md:mx-0'>
      <h1 className='text-5xl mb-4 bg-gradient-to-b from-sky-500 dark:to-neutral-500 to-black text-transparent bg-clip-text'>
        FIFO Page Replacement
      </h1>
      <p className='text-xs md:text-xl lg:mx-40 mx-4 mb-10 dark:text-neutral-500 text-black'>
        Đây là thuật toán thay thế trang đơn giản nhất. Trong thuật toán này, hệ
        điều hành theo dõi tất cả các trang trong bộ nhớ theo hàng đợi, trang cũ
        nhất nằm ở đầu hàng đợi. Khi cần thay thế một trang, trang ở đầu hàng
        đợi sẽ được chọn để loại bỏ.
      </p>

      {/* Input cho chuỗi tham chiếu */}
      <div className='my-2'>
        <label className='dark:text-neutral-500 text-black'>
          Chuỗi tham chiếu (ví dụ: 1,3,0,3,5,6,3):
        </label>
        <input
          className='border-2 border-slate-500 mx-4 rounded dark:text-sky-900'
          type='text'
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
          placeholder='Nhập chuỗi tham chiếu'
        />
      </div>

      {/* Input cho số khung trang */}
      <div className='my-2'>
        <label className='dark:text-neutral-500 text-black'>
          Số khung trang:
        </label>
        <input
          className='border-2 border-slate-500 mx-4 rounded dark:text-sky-900'
          type='number'
          value={pageFrames}
          onChange={(e) => setPageFrames(Number(e.target.value))}
          min={1}
          max={4}
        />
      </div>

      {/* Nút để khởi động mô phỏng FIFO */}
      <button
        className='my-2 border-2 border-sky-500 rounded hover:scale-90 hover:bg-sky-300 transition ease-in-out p-2 hover:text-black'
        onClick={initializeFIFO}
      >
        Bắt đầu
      </button>

      <div className='flex gap-20'>
        {/* Nút để tiến từng bước */}
        {frames.length > 0 && currentStep <= frames.length && (
          <button
            className='my-2 border-2 border-sky-500 rounded hover:scale-90 hover:bg-sky-300 transition ease-in-out lg:px-4 px-2 hover:text-black'
            onClick={nextStep}
          >
            Bước tiếp theo
          </button>
        )}

        {/* Nút để reset mô phỏng */}
        {frames.length > 0 && (
          <button
            className='my-2 border-2 border-sky-500 rounded hover:scale-90 hover:bg-sky-300 transition ease-in-out lg:py-2 py-1 lg:px-10 px-4 hover:text-black'
            onClick={resetSimulation}
          >
            Reset
          </button>
        )}
      </div>

      {/* Hiển thị kết quả khung trang tại mỗi bước */}
      <div>
        <h2>Kết quả:</h2>
        {frames.length > 0 && (
          <table border={1}>
            <thead>
              <tr>
                <th className='text-xs md:text-2xl'>Bước</th>
                {Array.from({ length: pageFrames }, (_, i) => (
                  <th
                    className='lg:p-4 p-0 text-xs md:text-2xl font-thin'
                    key={i}
                  >
                    Frame {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frames.slice(0, currentStep).map((step, stepIndex) => (
                <tr key={stepIndex}>
                  <td className='lg:p-4 p-2 text-xs md:text-2xl'>
                    B{stepIndex + 1}
                  </td>
                  {step.map((frame, frameIndex) => (
                    <td
                      className='lg:p-2 p-2 border-2 border-slate-500 text-center lg:text-2xl text-xs text-sky-500'
                      key={frameIndex}
                    >
                      {frame !== -1 ? frame : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Hiển thị giải thích từng bước */}
        <div className='my-10 ml-20 text-2xl'>
          <p>{explanation}</p>
        </div>
        {/* Hiển thị thông báo hoàn thành nếu có */}
        {/* {isCompleted && (
          <div className='mt-5 text-green-500'>
            <strong>Đã hoàn thành tất cả các bước!</strong>
          </div>
        )} */}
        {/* Hiển thị số lỗi trang */}
        <div className='my-10 text-center'>
          <h3 className='text-3xl'>
            Tổng số lỗi trang: <span>{pageFaults}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FIFO;