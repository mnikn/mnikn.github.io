import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { menuItems } from '@/constants/menu'
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
            {menuItems.map(item => (
              <NavigationMenuItem key={item.key}>
                <Link to={item.path} className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
