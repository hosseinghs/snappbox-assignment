export default function RenderRegisterResult ({ success }: { success: boolean }) {
  return (
    <div>
      {success ? <div>u r about to be redirected to login page :)</div> : <div>try again :(</div>}
    </div>
  )

}