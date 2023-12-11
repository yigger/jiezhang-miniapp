import Request from '../request'

export default class Chaos extends Request {
  async submitFeedback({ content }) {
    return await this.post('settings/feedback', {
      content: content,
      type: 0
    })
  }
}
