import { h } from 'preact'

const NoteSection = () => {
  return (
    <div className="note">
      <table>
        <tr>
          <th>Key</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>1</td>
          <td>sine</td>
        </tr>
        <tr>
          <td>2</td>
          <td>square</td>
        </tr>
        <tr>
          <td>3</td>
          <td>sawtooth</td>
        </tr>
        <tr>
          <td>4</td>
          <td>triangle</td>
        </tr>
        <tr>
          <td>+</td>
          <td>increase octave</td>
        </tr>
        <tr>
          <td>-</td>
          <td>decrease octave</td>
        </tr>
      </table>
    </div>
  )
}

export default NoteSection
