import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="text-lg font-bold mr-4">
                Mnikn's World
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/posts" className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                文章
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/posts" className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                游戏
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/posts" className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                画廊
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                关于我
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
