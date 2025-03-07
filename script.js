document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const A = [45833, 24864, 29875, 19846, 58797, 98728, 65829, 18310, 
           95711, 49212, 2813, 82214, 48315, 19316, 92717, 39218, 
           10219, 38111, 14272];
    const usedNumbers = new Set();
    const buttonClickCounts = new Map(); // Lưu số lần bấm của từng nút

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(A);

    buttons.forEach(button => {
        buttonClickCounts.set(button, 0); // Khởi tạo số lần bấm cho mỗi nút

        button.addEventListener('click', () => {
            const parentRow = button.closest('tr');
            const cells = parentRow.querySelectorAll('td:not(.have)'); // Lấy các ô cần điền số
            let delay = 0;
            let maxRandomCount = cells.length; // Số ô cần điền

            // Nếu là G.6, chỉ được random 3 lần
            if (button.textContent.trim() === 'G.6') {
                let clickCount = buttonClickCounts.get(button);
                if (clickCount >= 3) {
                    console.log("Đã random đủ 3 lần cho G.6.");
                    return;
                }
                maxRandomCount = 3; // Chỉ chạy tối đa 3 lần
                buttonClickCounts.set(button, clickCount + 1); // Cập nhật số lần bấm
            }

            let availableNumbers = A.filter(number => !usedNumbers.has(number));

            for (let i = 0; i < cells.length && maxRandomCount > 0; i++) {
                const cell = cells[i];
                if (cell.textContent.trim() === '-----' && availableNumbers.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                    const randomNumber = availableNumbers[randomIndex];

                    setTimeout(() => {
                        cell.textContent = randomNumber;
                        usedNumbers.add(randomNumber);
                    }, delay);

                    delay += 1250;
                    availableNumbers.splice(randomIndex, 1); // Xóa số đã dùng khỏi danh sách
                    maxRandomCount--; // Giảm số ô cần điền
                }
            }
        });
    });
});
                          
