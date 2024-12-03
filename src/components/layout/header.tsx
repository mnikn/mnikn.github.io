import { Link } from 'react-router-dom'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { menuItems } from '@/constants/menu'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <NavigationMenu>
          <NavigationMenuList className="overflow-auto">
            <NavigationMenuItem>
              <Link to="/" className="text-lg font-bold mr-4 text-center flex items-center">
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
