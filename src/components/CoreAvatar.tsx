import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Avatar as AvatarPrimitive} from "@base-ui-components/react/avatar";

function getInitials(name: string) {
  const names = name.trim().split(" ")
  const firstName = names[0] != null ? names[0] : ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

interface CoreAvatarProps extends AvatarPrimitive.Image.Props{
  name?: string
}

export default function CoreAvatar({ className, name, ...props }: CoreAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        {...props}
      />
      {name && <AvatarFallback className={className}>{getInitials(name)}</AvatarFallback>}
    </Avatar>
  )
}
