
# useState hook

### Dùng khi nào ?
Khi muốn dữ liệu thay đổi thì giao diện tự động được cập nhật(render lại theo dữ liệu)


### Cách dùng

```jsx
import {userStates} from 'react'
useState là hàm số nhận vào giá trị khởi tạo cho state , hàm này trả về array.
Giá trị trả về đầu tiên là state và giá trị thứ 2 là 1 hàm số dùng để set lại giá trị cho state.
function Compoent(){
    const [states,setStates] = useStates(initState)
    ...
}
```
### Lưu ý 
- Compoenent được re-render sau khi call `setStates`
- Initial state chỉ dùng cho lần đầu
- Set state với callback
- Initial state với callback
- Set state là thay thế state bằng giá trị mới.