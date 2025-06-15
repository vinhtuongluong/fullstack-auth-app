import { handleUpdateUserAction } from '@/utils/actions'
import { Form, message, notification, Modal, Input } from 'antd'
import { useEffect } from 'react'

interface IProps {
  isUpdateModalOpen: boolean
  setIsUpdateModalOpen: (value: boolean) => void
  dataUpdate: any
  setDataUpdate: (value: any) => void
}

const UserUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props
  const [form] = Form.useForm()

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
      })
    }
  }, [dataUpdate])

  const handleCloseUpdateModal = () => {
    form.resetFields()
    setIsUpdateModalOpen(false)
    setDataUpdate(null)
  }

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const { name, phone, address } = values
      const res = await handleUpdateUserAction({
        _id: dataUpdate._id,
        name,
        phone,
        address,
      })
      if (res?.data) {
        handleCloseUpdateModal()
        message.success('Update user successfully')
      } else {
        notification.error({
          message: 'Update user failed',
          description: res?.message,
        })
      }
    }
  }

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
      onCancel={handleCloseUpdateModal}
      onOk={() => form.submit()}
      okText="OK"
      cancelText="Cancel"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            label="Email"
            name="email"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item label="Phone" name="phone" style={{ flex: 1 }}>
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address" style={{ flex: 1 }}>
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default UserUpdate
