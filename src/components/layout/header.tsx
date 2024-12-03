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
      <div className="container flex max-sm:h-20 h-16 items-center w-full">
        <NavigationMenu className="max-sm:max-w-full">
          <NavigationMenuList className="overflow-auto">
            <div className="flex items-center max-sm:flex-col">
              <NavigationMenuItem>
                <Link to="/" className="text-lg font-bold mr-4 text-center flex items-center">
                  Mnikn's World
                </Link>
              </NavigationMenuItem>
              <div className="flex items-center">
                {menuItems.map(item => (
                  <NavigationMenuItem key={item.key}>
                    <Link to={item.path} className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
