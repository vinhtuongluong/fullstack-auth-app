import { handleCreateUserAction } from '@/utils/actions'
import { Form, Input, message, Modal, notification } from 'antd'

interface IProps {
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (value: boolean) => void
}

const UserCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props
  const [form] = Form.useForm()

  const handleCloseCreateModal = () => {
    form.resetFields()
    setIsCreateModalOpen(false)
  }

  const onFinish = async (values: any) => {
    const res = await handleCreateUserAction(values)
    if (res?.data) {
      handleCloseCreateModal()
      message.success('Create user successfully')
    } else {
      notification.error({
        message: 'Create user failed',
        description: res?.message,
      })
    }
  }
  return (
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
      onCancel={handleCloseCreateModal}
      onOk={() => form.submit()}
      okText="OK"
      cancelText="Cancel"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserCreate
