# 导入PIL库中的Image模块, 用于处理图片
from PIL import Image

# 导入os模块, 用于操作文件和目录
import os

# 定义源目录路径, 存放需要处理的图片
src_dir = 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/textures_input'

# 定义目标目录路径, 存放处理后的图片
dst_dir = 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/textures_output'

def process_image(img):
	"""处理图像并根据尺寸生成不同版本"""
	# 创建一个空字典, 用于存储处理后的图片版本
	processed = {}
	# 如果图片的宽度和高度都小于等于16像素
	if img.width <= 16 and img.height <= 16:
		# 根据图片模式选择背景颜色：RGBA模式使用透明背景, RGB模式使用白色背景
		fill_color = (0, 0, 0, 0) if img.mode == 'RGBA' else (255, 255, 255)
		# 如果图片尺寸不是16x16, 则需要填充到16x16
		if img.size != (16, 16):
			# 创建一个新的16x16画布, 背景颜色为之前定义的fill_color
			new_img = Image.new(img.mode, (16, 16), fill_color)
			# 计算将原图居中粘贴到新画布上的位置
			paste_pos = (
				(16 - img.width) // 2,  # 水平方向的偏移量
				(16 - img.height) // 2  # 垂直方向的偏移量
			)
			# 将原图粘贴到新画布上
			new_img.paste(img, paste_pos)
			# 更新img为新的16x16图片
			img = new_img
		# 生成标准缩放版本, 并存入processed字典
		processed = {
			'16x16': img,  # 原始大小（16x16）
			'32x32': img.resize((32, 32), Image.NEAREST),  # 放大到32x32
			'128x128': img.resize((128, 128), Image.NEAREST)  # 放大到128x128
		}
	# 如果图片的宽度和高度都小于32像素, 则生成一个新的32x32背景
	elif img.width < 32 and img.height < 32:
		# 根据图片模式选择背景颜色：RGBA模式使用透明背景, RGB模式使用白色背景
		fill_color = (0, 0, 0, 0) if img.mode == 'RGBA' else (255, 255, 255)
		# 创建一个新的32x32画布, 背景颜色为之前定义的fill_color
		new_img = Image.new(img.mode, (32, 32), fill_color)
		# 计算将原图居中粘贴到新画布上的位置
		paste_pos = (
			(32 - img.width) // 2,  # 水平方向的偏移量
			(32 - img.height) // 2  # 垂直方向的偏移量
		)
		# 将原图粘贴到新画布上
		new_img.paste(img, paste_pos)
		# 更新img为新的32x32图片
		img = new_img
		# 生成标准缩放版本, 并存入processed字典
		processed = {
			'32x32': img,  # 原始大小（32x32）
			'64x64': img.resize((64, 64), Image.NEAREST),  # 放大到64x64
			'128x128': img.resize((128, 128), Image.NEAREST),  # 放大到128x128
			'256x256': img.resize((256, 256), Image.NEAREST)  # 放大到256x256
		}
	else:
		# 如果图片的任一维度超过16像素
		original_w, original_h = img.size  # 获取图片的原始宽度和高度
		# 生成放大版本, 并存入processed字典
		processed = {
			f'{original_w*2}x{original_h*2}': img.resize((original_w*2, original_h*2), Image.NEAREST),  # 放大到2倍
			f'{original_w*8}x{original_h*8}': img.resize((original_w*8, original_h*8), Image.NEAREST)  # 放大到8倍
		}
	# 返回包含所有处理后图片版本的字典
	return processed
# 初始化计数器, 用于统计总文件数、成功处理文件数和跳过/失败文件数
total_files = 0
processed_files = 0
skipped_files = 0
# 提示用户开始扫描目录
print("正在扫描目录结构...")
# 预扫描统计总文件数
for root, _, files in os.walk(src_dir):  # 遍历源目录及其子目录
	total_files += len([f for f in files if f.lower().endswith('.png')])  # 统计所有PNG文件数量
# 显示找到的PNG文件总数
print(f"找到 {total_files} 个PNG文件, 开始处理.../n")
# 处理主循环
for root, dirs, files in os.walk(src_dir):  # 再次遍历源目录及其子目录
	# 遍历当前目录下的所有文件
	for filename in files:
		# 如果文件是PNG格式
		if filename.lower().endswith('.png'):
			# 获取文件的完整路径
			file_path = os.path.join(root, filename)
			# 获取文件相对于源目录的路径
			relative_path = os.path.relpath(root, src_dir)
			# 构造目标目录路径
			target_dir = os.path.join(dst_dir, relative_path)
			# 尝试处理图片
			try:
				with Image.open(file_path) as img:  # 打开图片文件
					# 进度计算
					current_count = processed_files + skipped_files + 1  # 当前处理的文件序号
					progress = current_count / total_files * 100  # 计算处理进度百分比
					# 显示处理信息
					status = f"[{progress:.1f}%] 正在处理: {os.path.join(relative_path, filename)}"
					print(status.ljust(80), end='/r')  # 实时显示处理进度
					# 创建目标目录（如果不存在则创建）
					os.makedirs(target_dir, exist_ok=True)
					# 处理图像
					base_name = os.path.splitext(filename)[0]  # 获取文件名（不带扩展名）
					processed = process_image(img)  # 调用process_image函数处理图片
					# 保存所有版本
					for size, image in processed.items():  # 遍历处理后的图片版本
						output_path = os.path.join(target_dir, f'{base_name}_{size}.png')  # 构造输出文件路径
						image.save(output_path)  # 保存图片到目标目录
					# 成功处理的文件数加1
					processed_files += 1

			except Exception as e:  # 如果发生异常
				# 跳过/失败的文件数加1
				skipped_files += 1
				# 输出错误信息
				print(f"/n处理失败：{file_path} | 错误：{str(e)}")
# 最终报告 提示用户处理完成
print("/n/n处理完成！")
# 显示成功处理的文件数
print(f"成功处理文件数: {processed_files}")
# 显示跳过或失败的文件数
print(f"跳过/失败文件数: {skipped_files}")
# 解释生成的文件分布
print("生成文件分布：")
print("- 小于等于16x16的图片生成：16x16, 32x32, 128x128版本")
print("- 大于16x16且小于32x32的图片生成：32x32, 64x64, 128x128, 256x256版本")
print("- 大于等于32x32的图片生成：2倍尺寸和8倍尺寸版本")