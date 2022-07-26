type Status = 'pending' | 'success' | 'error'

export function wrapPromise<T>(promise: Promise<T>) {
  let status: Status = 'pending'
  let error: Error
  let response: T

  const suspender = promise.then(
    (res: T) => {
      status = 'success'
      response = res
    },
    (err: Error) => {
      status = 'error'
      error = err
    }
  )

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw error
      default:
        return response
    }
  }

  return { read }
}
